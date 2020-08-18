/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  // WatchFolders is only needed due to the yarn workspace layout of node_modules, we need to watch the symlinked locations separately
  watchFolders: [
    // Include hoisted modules
    path.resolve(__dirname, '../../node_modules'),
  ],
  
  resolver: {
    extraNodeModules: {
      // Redirect react-native-dualscreeninfo to avoid symlink (metro doesn't like symlinks)
      'react-native-dualscreeninfo': path.resolve(__dirname, '../../dualscreeninfo'),
    }
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
