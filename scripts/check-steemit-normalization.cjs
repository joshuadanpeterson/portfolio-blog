const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

function loadTsModule(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });

  const module = { exports: {} };
  const sandbox = {
    console,
    exports: module.exports,
    module,
    require,
    URL,
  };

  vm.runInNewContext(outputText, sandbox, { filename: filePath });
  return module.exports;
}

const { mapSteemitPost } = loadTsModule(
  path.join(__dirname, "..", "src", "lib", "steemit.ts"),
);

const normalized = mapSteemitPost({
  post_id: 12345,
  author: "joshpeterson",
  permlink: "the-future-of-politics",
  category: "writing",
  title: "The Future of Politics",
  created: "2018-04-20T06:45:03",
  body: "<p>Fallback body should not win when metadata has a description.</p>",
  json_metadata: JSON.stringify({
    description:
      "To be a responsible citizen of the 21st Century requires a new kind of civic awareness.",
    image: [
      "https://cdn.pixabay.com/photo/2018/03/26/13/48/artificial-intelligence-3262753_1280.jpg",
    ],
  }),
});

assert.equal(normalized.title, "The Future of Politics");
assert.equal(
  normalized.link,
  "https://steemit.com/writing/@joshpeterson/the-future-of-politics",
);
assert.equal(normalized.pubDate, "2018-04-20T06:45:03.000Z");
assert.equal(
  normalized.contentSnippet,
  "To be a responsible citizen of the 21st Century requires a new kind of civic awareness.",
);
assert.equal(
  normalized.imageUrl,
  "https://cdn.pixabay.com/photo/2018/03/26/13/48/artificial-intelligence-3262753_1280.jpg",
);
assert.equal(normalized.source, "steemit");
assert.equal(normalized.externalId, "12345");

const htmlImageFallback = mapSteemitPost({
  author: "joshpeterson",
  permlink: "html-image",
  category: "blog",
  title: "HTML Image",
  created: "2018-05-18T16:39:54",
  body: "<center><img src='http://steemitimages.com/example.jpg'></center><p>Hello from the body.</p>",
});

assert.equal(htmlImageFallback.imageUrl, "https://steemitimages.com/example.jpg");
assert.equal(htmlImageFallback.contentSnippet, "Hello from the body.");

console.log("Steemit normalization checks passed.");
