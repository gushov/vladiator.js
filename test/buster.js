var config = module.exports;

config["lilobj node tests"] = {
  rootPath: "../",
  environment: "node",
  tests: [
    "test/*-test.js"
  ]
};

config["lilobj browser tests"] = {
  rootPath: "../",
  environment: "browser",
  sources: [
    "node_modules/es5-shim/es5-shim.js",
    "node_modules/lilprovider/dist/lilprovider.js",
    "node_modules/lil_/dist/lil_.js",
    "lib/vladiator.js"
  ],
  tests: [
    "test/*-test.js"
  ]
};