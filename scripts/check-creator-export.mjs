import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const outputDir = resolve("out");
const productBase = "https://chrisizworski.com/everyday-tools";
const personId = "https://chrisizworski.com/#person";
const personUrl = "https://chrisizworski.com/";
const profileUrl = "https://chrisizworski.com/chris-izworski/";
const toolsUrl = "https://chrisizworski.com/tools/";

function decodeEntities(value) {
  return value
    .replace(/&#x27;/gi, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/gi, "/")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function htmlFiles(directory) {
  return readdirSync(directory).flatMap((name) => {
    const p = join(directory, name);
    const rel = relative(outputDir, p).replaceAll("\\", "/");
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return rel.endsWith(".html") && rel !== "404.html" && rel !== "404/index.html" ? [rel] : [];
  });
}

function getCanonical(html, route) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const tag = tags.find((candidate) => /\brel="canonical"/i.test(candidate));
  assert.ok(tag, `${route}: canonical link is missing`);
  return tag.match(/\bhref="([^"]+)"/i)?.[1] || "";
}

function creatorGraphs(html, route) {
  const scripts = [
    ...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ];
  const parsed = scripts.map((match) => {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      throw new Error(`${route}: invalid JSON-LD: ${error.message}`);
    }
  });
  return parsed.flatMap((value) => (Array.isArray(value["@graph"]) ? [value] : []));
}

assert.ok(statSync(outputDir).isDirectory(), "out/ does not exist; run npm run build first");
const routes = htmlFiles(outputDir).sort();
assert.ok(routes.length >= 90, `Expected at least 90 exported pages, found ${routes.length}`);

for (const route of routes) {
  const html = readFileSync(join(outputDir, route), "utf8");
  const relDir = route === "index.html" ? "" : route.replace(/\/index\.html$/, "");
  const expectedUrl = relDir ? `${productBase}/${relDir}/` : `${productBase}/`;

  assert.equal(getCanonical(html, route), expectedUrl, `${route}: canonical URL mismatch`);

  const title = decodeEntities((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "");
  const description = decodeEntities(
    (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || ""
  );
  assert.ok(title.length > 0 && title.length <= 60, `${route}: title length ${title.length} > 60 (${title})`);
  assert.ok(
    description.length > 0 && description.length <= 158,
    `${route}: description length ${description.length} > 158 (${description})`
  );

  assert.ok(
    html.includes(`href="${profileUrl}"`) && html.includes("Built by"),
    `${route}: profile-linked creator credit is missing`
  );
  assert.ok(html.includes(`href="${toolsUrl}"`), `${route}: Tools hub discovery link is missing`);

  const graphs = creatorGraphs(html, route);
  const nodes = graphs.flatMap((graph) => graph["@graph"]);
  const people = nodes.filter((node) => node["@type"] === "Person" && node["@id"] === personId);
  const pages = nodes.filter((node) => node["@type"] === "WebPage" && node.url === expectedUrl);

  assert.equal(people.length, 1, `${route}: expected exactly one canonical Person node`);
  assert.equal(people[0].name, "Chris Izworski", `${route}: Person name changed`);
  assert.equal(people[0].url, personUrl, `${route}: Person homepage URL changed`);
  assert.equal(pages.length, 1, `${route}: expected one WebPage for ${expectedUrl}`);
  assert.equal(pages[0]["@id"], `${expectedUrl}#webpage`, `${route}: WebPage @id mismatch`);
  assert.ok(pages[0].dateModified, `${route}: WebPage dateModified missing`);
  assert.deepEqual(pages[0].author, { "@id": personId }, `${route}: author mismatch`);
  assert.deepEqual(pages[0].publisher, { "@id": personId }, `${route}: publisher mismatch`);
}

console.log(`Creator authority, SERP lengths & canonicals verified on ${routes.length} exported pages.`);
