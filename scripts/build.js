const { build } = require("esbuild");

const { peerDependencies } = require("../package.json");

build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: false,
  sourcemap: true,
  external: Object.keys(peerDependencies || {}),
  outfile: "dist/index.js",
});
