const fs = require('fs');

function copyDirectory(source, destination, callback) {

  callback = (err) => {
    if (err) {
      // Handle the error
      console.error('Copy operation failed:', err);
    } else {
      // Success
      console.log('Copy operation completed successfully');
    }
  };


  fs.cp(source, destination, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      console.log('Directory copied successfully');
      callback(null);
    }
  });
}

module.exports = copyDirectory;
