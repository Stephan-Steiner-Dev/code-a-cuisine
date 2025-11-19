module.exports = {
  '/webhook': {
    target: 'http://localhost:5678',
    changeOrigin: true,
    secure: false,
  }
};
