const { getDefaultConfig } = require("expo/metro-config");

const config = {
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, "lottie"],
  },
};

const defaultConfig = getDefaultConfig(__dirname, config);

module.exports = defaultConfig;
