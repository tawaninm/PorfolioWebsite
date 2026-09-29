// Checks that every image path referenced in src/data/projects.ts exists under public/.
// Usage: node tests/smoke/check-images.mjs
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const source = readFileSync(join(root, "src/data/projects.ts"), "utf8");
const paths = [...new Set(source.match(/"\/[^"]+\.(?:png|jpe?g|webp|gif|svg|avif)"/gi) || [])].map((p) => p.slice(1, -1));

let missing = 0;
for (const p of paths) {
  const file = join(root, "public", decodeURIComponent(p));
  if (!existsSync(file)) {
    missing++;
    console.log(`MISSING  ${p}`);
  }
}
console.log(`\n${paths.length - missing}/${paths.length} image paths exist`);
process.exit(missing ? 1 : 0);
