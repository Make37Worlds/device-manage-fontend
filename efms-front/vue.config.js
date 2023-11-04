const { defineConfig } = require("@vue/cli-service");

const resolve = require("path").resolve;

module.exports = defineConfig({
    transpileDependencies: true,
    productionSourceMap: false,
    runtimeCompiler: true,
    parallel: false
});