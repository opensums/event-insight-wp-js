// vue.config.js

require('dotenv').config();

// Make sure these properties are set in package.json!
const { name, version, homepage, author, license } = require('./package.json');

const plugins = [];

// First year of publication.
const firstYear = 2020;

// Use version in output filenames.
// const useVersion = false;

const now = new Date();
const date = now
  .toISOString()
  .substring(0, 19)
  .replace('T', ' ');
const year = now.getUTCFullYear();
const years = year === firstYear ? year : `${firstYear}-${year}`;

// Banner for minified output.
const { BannerPlugin } = require('webpack');

const banner = `${name} v${version} ${date}
${homepage}
Copyright © ${years} ${author}
License: ${license}`;

plugins.push(new BannerPlugin({ banner, raw: false }));

// Deal with Bundle Analyzer.
let BundleAnalyzerPlugin;
if (process.env.ANALYZE_BUNDLE_SIZE) {
  ({ BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'));
  plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

module.exports = {
  configureWebpack: { plugins },
};
