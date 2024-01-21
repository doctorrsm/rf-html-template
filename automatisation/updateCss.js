const {glob} = require('glob');
const sass = require('sass');
const path = require('path');
const fsPromises = require('node:fs').promises;
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssDeclarationSorter = require('css-declaration-sorter');
const fs = require("fs");
const compileSassFile = async (file) => {
  return sass.compile(file);
};

const processCssWithPostcss = async (css) => {
  return postcss([autoprefixer, cssDeclarationSorter({ order: 'smacss' })]).process(css);
};

const writeCssFile = async (cssDistDir, cssFileName, cssContent) => {
  await fsPromises.writeFile(path.join(cssDistDir, cssFileName), cssContent);
};

const updateCss = async (cssSrcDir, cssDistDir) => {
  try {

    if (!fs.existsSync(cssDistDir)){
      fs.mkdirSync(cssDistDir, { recursive: true });
    }
    const files = await glob(`${cssSrcDir}/*.scss`);

    for (let file of files) {
      try {
        const result = await compileSassFile(file);
        const cssFileName = path.basename(file, '.scss') + '.css';
        const processedResult = await processCssWithPostcss(result.css);
        await writeCssFile(cssDistDir, cssFileName, processedResult.css);
      } catch (err) {
        console.error(`Error processing file ${file}: ${err}`);
      }
    }
  } catch (err) {
    console.error(`Error reading SCSS files: ${err}`);
  }
};

module.exports = updateCss;