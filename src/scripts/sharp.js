const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, '../public/images');

fs.readdirSync(target)
  .forEach((image) => {
    sharp(`${target}/${image}`)
      .resize(720)
      .toFile(path.resolve(
        __dirname,
        `${target}/${image.split('.').slice(0, -1).join('.')}-medium.webp`,
      ));

    sharp(`${target}/${image}`)
      .resize(480)
      .toFile(path.resolve(
        __dirname,
        `${target}/${image.split('.').slice(0, -1).join('.')}-small.webp`,
      ));
  });
