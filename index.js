const chokidar = require('chokidar');
const liveServer = require('live-server');
const { liveServerParams, directories } = require('./automatisation/config.js');
const renderHtml = require('./automatisation/renderHtml.js');
const updateCss = require('./automatisation/updateCss.js');
const runWebpack = require('./automatisation/runWebpack');
const optimizeImages = require('./automatisation/optimizeImages');
const copyDirectory = require("./automatisation/copyDirectory");

const handleHtmlChange = () => {
  renderHtml(directories.htmlSrc, directories.htmlDist);
};

const handleCssChange = () => {
  updateCss(directories.cssSrc, directories.cssDist);
};
const handleJsChange = () => {
  runWebpack();
};

const handleImgChanges = () => {
  optimizeImages(directories.imgSrc, directories.imgDist);
};

const handleFontsChange = () => {
  copyDirectory(directories.fontsSrc, directories.fontsDist);
}

const handleLiveServer = () => {
  setTimeout(() => liveServer.start(liveServerParams), 3000);
};

handleHtmlChange();
handleCssChange();
handleJsChange();
handleImgChanges();

chokidar.watch(`${directories.htmlSrc}/**/*`).on('all', handleHtmlChange);
chokidar.watch(`${directories.cssSrc}/**/*`).on('all', handleCssChange);
chokidar.watch(`${directories.jsSrc}/**/*`).on('all', handleJsChange);
chokidar.watch(`${directories.imgSrc}/**/*`).on('all', handleImgChanges);
chokidar.watch(`${directories.fontsSrc}/**/*`).on('all', handleFontsChange);
handleLiveServer();
