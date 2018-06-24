const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'build')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function(){
                return [
                  require('postcss-cssnext')({
                    browsers: ['last 2 version'],
                    features: {
                      rem: false,
                      customProperties: {
                        preserve: true,
                        warnings: false
                      }
                    }
                  })
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|woff)/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        minifyCSS: true,
        removeScriptTypeAttributes: true,
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  mode: 'production'
})