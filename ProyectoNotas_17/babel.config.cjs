module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: { node: 'current' }, // Configura Babel para la versión actual de Node.js
      modules: 'auto',  // Esto asegura que los módulos se manejen correctamente
    }],
  ],
};
