const { build } = require("esbuild");

const { peerDependencies } = require("../package.json");

build({
  bundle: true,
  entryPoints: ["src/index.ts"],
  external: Object.keys(peerDependencies || {}),
  minify: false,
  outfile: "dist/index.js",
  platform: "node",
  sourcemap: true,
});
