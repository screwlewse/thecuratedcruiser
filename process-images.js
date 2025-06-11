const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = 'images/src';
const outputDir = 'images/processed';

// Make sure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files from the source directory
if (fs.existsSync(sourceDir)) {
  const imageFiles = fs.readdirSync(sourceDir)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

  // Process each image
  imageFiles.forEach(file => {
    const filePath = path.join(sourceDir, file);
    const fileNameWithoutExt = path.parse(file).name;
    const fileExt = path.parse(file).ext;

    // Create small version (480px width)
    sharp(filePath)
      .resize(480, 480, {
        fit: 'cover',
        position: 'center'
      })
      .toFile(path.join(outputDir, `${fileNameWithoutExt}-small${fileExt}`))
      .catch(err => console.error(`Error processing ${file} for small size:`, err));

    // Create medium version (768px width)
    sharp(filePath)
      .resize(768, 768, {
        fit: 'cover',
        position: 'center'
      })
      .toFile(path.join(outputDir, `${fileNameWithoutExt}-medium${fileExt}`))
      .catch(err => console.error(`Error processing ${file} for medium size:`, err));

    // Create large version (1200px width)
    sharp(filePath)
      .resize(1200, 1200, {
        fit: 'cover',
        position: 'center'
      })
      .toFile(path.join(outputDir, `${fileNameWithoutExt}-large${fileExt}`))
      .catch(err => console.error(`Error processing ${file} for large size:`, err));

    // Create optimized original
    sharp(filePath)
      .jpeg({ quality: 85 })
      .toFile(path.join(outputDir, file))
      .catch(err => console.error(`Error optimizing ${file}:`, err));
  });

  console.log(`Processed ${imageFiles.length} images`);
} else {
  console.log(`Source directory ${sourceDir} does not exist`);
}
