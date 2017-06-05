var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractSass = new ExtractTextPlugin({
    filename: "style.css",
    disable: process.env.NODE_ENV === "development"
});

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app')

var config = {
  entry: APP_DIR + '\\index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      }, {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
    }, {
        test:   /\.css$/,
        loader: "style-loader!css-loader"
      }]
},
plugins: [
        extractSass
    ]
};

module.exports = config;
