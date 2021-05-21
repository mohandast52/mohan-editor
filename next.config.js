const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");

const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {};
}

module.exports = withSass(
  withCSS(
    withLess(
      withFonts({
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
        webpack: (config) => {
          config.plugins.push(
            new MonacoWebpackPlugin({
              languages: [
                "json",
                "css",
                "java",
                "javascript",
                "html",
                "java",
                "python",
                "scss",
                "cpp",
              ],
            })
          );

          config.module.rules.push(
            {
              test: /\.ttf$/,
              use: ["file-loader"],
            },
          );

          return config;
        },
      })
    )
  )
);
