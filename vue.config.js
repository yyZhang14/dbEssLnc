const path = require("path");
const debug = process.env.NODE_ENV !== "production";

module.exports = {
  // 基本路径 相对路径
  publicPath: "./",
  // 输出文件目录
  // outputDir: "dist",
  outputDir: process.env.outputDir,
  assetsDir: "assets", // 静态资源目录 (js, css, img, fonts)的（相对于outputDir的）目录
  // indexPath: "index.html",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,

  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md   webpack链接API，用于生成和修改webapck配置
  chainWebpack: () => {
    if (debug) {
      // 本地开发配置
    } else {
      // 生产开发配置
    }
  },
  configureWebpack: config => {
    // webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (debug) {
      // 开发环境配置
      config.devtool = "cheap-module-eval-source-map";
      config.mode = "development";
    } else {
      // 生产环境配置
      config.mode = "production";
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src") //设置路径别名
          //...
        }
      }
    });
  },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置 配置高于chainWebpack中关于css loader的配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?是否在构建样式地图，false将提高构建速度
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    requireModuleExtension: true
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores 构建时开启多进程处理babel编译
  parallel: require("os").cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,

  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    host: "localhost",
    port: 3000,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://localhost:8080",//设置你调用的接口域名和端口号
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }, // 设置代理
    // eslint-disable-next-line no-unused-vars
    before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
