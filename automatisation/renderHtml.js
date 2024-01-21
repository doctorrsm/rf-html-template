const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const {glob} = require('glob');
var posthtml = require('posthtml');
const include = require('posthtml-include')
const expressions = require('posthtml-expressions')
const renderHtml = async (htmlSrcDir, htmlDistDir) => {
  try {

    if (!fs.existsSync(htmlDistDir)){
      fs.mkdirSync(htmlDistDir, { recursive: true });
    }

    const files = await glob(htmlSrcDir + "/*.html");

    for (let file of files) {
      const data = await fsPromises.readFile(file, "utf8" ); // Use fs.promises.readFile

      posthtml([

        require('posthtml-extend')({encoding: 'utf8',}),
        include({encoding: 'utf8'}),
        expressions({ locals: {name: 'Marlo' }, removeScriptLocals: true},),
      ])
        .process(data)
        .then(async function (result) {

        const filename = path.basename(file);
        await fsPromises.writeFile(path.join(htmlDistDir, filename), result.html);
      });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = renderHtml;