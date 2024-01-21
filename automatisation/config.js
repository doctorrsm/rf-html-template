let directories = {
  htmlSrc: './src/html/',
  htmlDist: './dist/',
  cssSrc: './src/scss/',
  cssDist: './dist/css/',
  imgSrc: './src/images/',
  imgDist: './dist/images/',
  jsSrc: './src/js/',
  jsDist: './dist/js/',
  fontsSrc: './src/fonts/',
  fontsDist: './dist/fonts/'

};

const liveServerParams = {
  port: 3001, // Set the server port. Defaults to 8080.
  root: directories.htmlDist, // Set root directory that's being served. Defaults to cwd.
  open: true, // When false, it won't load your browser by default.
  wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
};

module.exports = { liveServerParams, directories };