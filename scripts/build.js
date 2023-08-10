const { build } = require("esbuild");

const { dependencies, peerDependencies } = require("../package.json");

const external = [
  //   ...Object.keys(dependencies || {}),
  ...Object.keys(peerDependencies || {}),
];

const sharedConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  external,
};

build({
  ...sharedConfig,
  platform: "node", // for CJS
  outfile: "dist/index.js",
});

// build({
//   ...sharedConfig,
//   outfile: "dist/index.esm.js",
//   platform: "neutral", // for ESM
//   format: "esm",
// });
