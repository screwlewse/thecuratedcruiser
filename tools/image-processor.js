const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const SRC_DIR = path.join(__dirname, '..', 'img', 'src');
const PROCESSED_DIR = path.join(__dirname, '..', 'img', 'processed');
const SIZES = {
    small: 400,
    medium: 800,
    large: 1200
};

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * Ensure the processed directory exists
 */
function ensureProcessedDir() {
    if (!fs.existsSync(PROCESSED_DIR)) {
        fs.mkdirSync(PROCESSED_DIR, { recursive: true });
        console.log(`Created directory: ${PROCESSED_DIR}`);
    }
}

/**
 * Get the base filename without extension
 */
function getBaseFilename(filename) {
    return path.parse(filename).name;
}

/**
 * Get the file extension
 */
function getFileExtension(filename) {
    return path.parse(filename).ext.toLowerCase();
}

/**
 * Check if a file is a supported image format
 */
function isSupportedImage(filename) {
    const ext = getFileExtension(filename);
    return SUPPORTED_FORMATS.includes(ext);
}

/**
 * Process a single image file
 */
async function processImage(filename) {
    const srcPath = path.join(SRC_DIR, filename);
    const baseName = getBaseFilename(filename);
    const ext = getFileExtension(filename);
    
    console.log(`Processing: ${filename}`);
    
    try {
        // Load the image
        const image = sharp(srcPath);
        
        // Get original dimensions
        const metadata = await image.metadata();
        console.log(`  Original size: ${metadata.width}x${metadata.height}`);
        
        // Process each size
        for (const [sizeName, width] of Object.entries(SIZES)) {
            const outputFilename = `${baseName}-${sizeName}${ext}`;
            const outputPath = path.join(PROCESSED_DIR, outputFilename);
            
            // Check if output already exists and is newer than source
            if (fs.existsSync(outputPath)) {
                const srcStats = fs.statSync(srcPath);
                const outputStats = fs.statSync(outputPath);
                
                if (outputStats.mtime > srcStats.mtime) {
                    console.log(`  Skipping ${sizeName} (already up to date)`);
                    continue;
                }
            }
            
            // Resize the image
            await image
                .resize(width, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .jpeg({ quality: 85, progressive: true })
                .toFile(outputPath);
            
            // Get the new dimensions
            const resizedMetadata = await sharp(outputPath).metadata();
            console.log(`  Created ${sizeName}: ${resizedMetadata.width}x${resizedMetadata.height}`);
        }
        
        console.log(`✓ Completed processing: ${filename}\n`);
        
    } catch (error) {
        console.error(`✗ Error processing ${filename}:`, error.message);
    }
}

/**
 * Process all images in the src directory
 */
async function processAllImages() {
    console.log('Starting image processing...\n');
    
    ensureProcessedDir();
    
    try {
        const files = fs.readdirSync(SRC_DIR);
        const imageFiles = files.filter(isSupportedImage);
        
        if (imageFiles.length === 0) {
            console.log('No supported image files found in src directory.');
            return;
        }
        
        console.log(`Found ${imageFiles.length} image(s) to process:\n`);
        
        for (const filename of imageFiles) {
            await processImage(filename);
        }
        
        console.log('Image processing completed!');
        
    } catch (error) {
        console.error('Error reading source directory:', error.message);
    }
}

/**
 * Watch for new images and process them automatically
 */
function watchForNewImages() {
    console.log('Watching for new images in src directory...\n');
    
    ensureProcessedDir();
    
    fs.watch(SRC_DIR, { recursive: false }, async (eventType, filename) => {
        if (filename && isSupportedImage(filename)) {
            console.log(`\nNew image detected: ${filename}`);
            await processImage(filename);
        }
    });
}

// Main execution
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.includes('--watch') || args.includes('-w')) {
        watchForNewImages();
    } else {
        processAllImages();
    }
}

module.exports = {
    processAllImages,
    watchForNewImages,
    processImage
}; 