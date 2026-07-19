module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Requis par react-native-vision-camera + react-native-worklets-core
      // pour executer le frame processor (redimensionnement + inference TFLite)
      // directement sur le thread camera, sans passer par le bridge JS.
      ['react-native-worklets-core/plugin'],
    ],
  };
};
