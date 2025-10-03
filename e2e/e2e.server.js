const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../webpack.dev");

const PORT = 8088;

const compiler = Webpack(config);
const devServerOptions = {
  ...config.devServer,
  open: false,
  port: PORT,
  onListening: function (devServer) {
    if (!devServer) {
      throw new Error("DevServer не определён");
    }
    if (process.send) {
      process.send("ready");
    }
  },
};

const server = new WebpackDevServer(devServerOptions, compiler);
(async () => {
  try {
    console.log("Starting server on port " + PORT);
    await server.start();
    process.on("SIGINT", async () => {
      await server.stop();
      process.exit();
    });
  } catch (err) {
    console.error("Ошибка при запуске сервера:", err);
    process.exit(1);
  }
})();
