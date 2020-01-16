const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  // The entry file for the bundle
  entry: path.join(__dirname, 'src/client.js'),

  // The bundle file we will get in the result
  output: {
    path: path.join(__dirname, 'src/static/js'),
    filename: 'app.js',
  },

  module: {
    // Apply loaders to files that meet given conditions
    rules: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          query: {
            presets: [
              '@babel/preset-react',
              ['@babel/preset-env', { useBuiltIns: 'entry' }]
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              // Stage-1
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-logical-assignment-operators',
              ['@babel/plugin-proposal-optional-chaining', { loose: false }],
              ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
              ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
              '@babel/plugin-proposal-do-expressions'
            ]
          },
        }
      },
    ]
  },

  // Set max file size for performance check
  performance: {
    maxEntrypointSize: 2500000,
    maxAssetSize: 2500000
  },

  // Make minified version of the bundle file
  /*plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          dead_code: true,
          warnings: false
        },
        mangle: true,
        output: {
          comments: false,
          beautify: false
        }
      },
      sourceMap: false
    })
  ],*/

  // Start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};