// https://blog.logrocket.com/versatile-webpack-configurations-for-your-react-application-e6ebf6615cc
// https://webpack.js.org/concepts/targets/
// https://webpack.js.org/configuration/#use-different-config-file
// https://medium.com/code-oil/webpack-javascript-bundling-for-both-front-end-and-back-end-b95f1b429810
const path = require('path');
const serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'lib.node.js'
  }
  //…
};

const clientConfig = {
  target: 'web', // <=== can be omitted as default is 'web'
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'lib.js'
  }
  //…
};

module.exports = [ serverConfig, clientConfig ];