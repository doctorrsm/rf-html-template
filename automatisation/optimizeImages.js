const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

function optimizeImages(srcImgDir, distImgDir) {
  // Создание целевой директории, если она не существует
  if (!fs.existsSync(distImgDir)){
    fs.mkdirSync(distImgDir, { recursive: true });
  }

  // Рекурсивная функция для обхода директорий
  function processDirectory(currentDir, targetDir) {
    let files = fs.readdirSync(currentDir);

    files.forEach(file => {
      let fullPath = path.join(currentDir, file);
      let stat = fs.statSync(fullPath);

      if (stat && stat.isDirectory()) {
        // Создание поддиректории в целевой директории
        let newTargetDir = path.join(targetDir, file);
        if (!fs.existsSync(newTargetDir)) {
          fs.mkdirSync(newTargetDir, { recursive: true });
        }
        // Рекурсивный вызов для поддиректории
        processDirectory(fullPath, newTargetDir);
      } else if (stat && stat.isFile() && ['.jpg', '.jpeg', '.png'].includes(path.extname(file))) {
        // Оптимизация и сохранение изображений
        const filename = path.basename(file);
        sharp(fullPath)
          .resize(800) // Измените размер в соответствии с вашими требованиями
          .toFile(path.join(targetDir, filename), (err, info) => {
            if (err) console.error(err);
            // else console.log(info);
          });
      }
    });
  }

  // Начать обработку с исходной директории
  processDirectory(srcImgDir, distImgDir);
}

module.exports = optimizeImages;
