const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

async function loadWebExtPlugin() {
  const WebExtPlugin = await import('web-ext-plugin')
  return WebExtPlugin.default
}

module.exports = (env) => ({
  mode: 'none',
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
    contentScript: path.join(__dirname, 'src', 'contentScript.ts'),
    backgroundScript: path.join(__dirname, 'src', 'backgroundScript.ts'),
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      chunks: ['app'],
    }),
    () => loadWebExtPlugin().then((WebExtPlugin) => new WebExtPlugin({ sourceDir: 'dist' })),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/manifest*.json'],
          },
        },
        {
          from: `public/manifest_v${env.manifestVersion}.json`,
          to: 'manifest.json',
        },
      ],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
})
