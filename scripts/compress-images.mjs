import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import sharp from 'sharp';
import jpegtran from 'jpegtran-bin';

const imagesDir = path.resolve('public/images');
const supportedExts = new Set(['.jpg', '.jpeg', '.png']);

const files = fs
  .readdirSync(imagesDir)
  .filter((file) => supportedExts.has(path.extname(file).toLowerCase()));

if (files.length === 0) {
  console.log('No raster images found to compress.');
  process.exit(0);
}

for (const file of files) {
  const inputPath = path.join(imagesDir, file);
  const ext = path.extname(file).toLowerCase();
  const tempPath = path.join(imagesDir, `${path.basename(file, ext)}.optimized${ext}`);

  const before = fs.statSync(inputPath).size;

  if (ext === '.png') {
    await sharp(inputPath)
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true,
      })
      .toFile(tempPath);
  } else {
    const result = spawnSync(jpegtran, ['-copy', 'none', '-optimize', '-outfile', tempPath, inputPath], {
      stdio: 'inherit',
    });

    if (result.status !== 0) {
      throw new Error(`jpegtran failed for ${file}`);
    }
  }

  const after = fs.statSync(tempPath).size;

  if (after < before) {
    fs.copyFileSync(tempPath, inputPath);
    console.log(`${file} optimized (${before} -> ${after} bytes)`);
  } else {
    console.log(`${file} unchanged (${before} -> ${after} bytes)`);
  }

  fs.rmSync(tempPath, { force: true });
}
