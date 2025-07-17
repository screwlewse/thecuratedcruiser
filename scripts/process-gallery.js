const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const INPUT_DIR = 'gallery-raw';
const OUTPUT_DIR = 'gallery';
const THUMBNAIL_WIDTH = 250;
const FULL_SIZE_MAX_WIDTH = 1200;

// Supported image extensions
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.JPG', '.JPEG'];

// Ensure output directory exists
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Convert file extension to lowercase and .jpg
function normalizeExtension(filename) {
    const ext = path.extname(filename).toLowerCase();
    if (ext === '.jpeg') {
        return filename.replace(/\.jpeg$/i, '.jpg');
    }
    return filename;
}

// Convert filename to lowercase
function normalizeFilename(filename) {
    return filename.toLowerCase();
}

// Process a single image
async function processImage(inputPath, outputFullPath, outputThumbPath) {
    try {
        console.log(`Processing: ${path.basename(inputPath)}`);

        // Create full-size version (max 1200px width)
        await sharp(inputPath)
            .resize(FULL_SIZE_MAX_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .jpeg({ quality: 85 })
            .toFile(outputFullPath);

        // Create thumbnail version (300px width)
        await sharp(inputPath)
            .resize(THUMBNAIL_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .jpeg({ quality: 80 })
            .toFile(outputThumbPath);

        console.log(`✓ Created: ${path.basename(outputFullPath)} and thumbnail`);

    } catch (error) {
        console.error(`Error processing ${inputPath}:`, error.message);
    }
}

// Process all images in a vehicle folder
async function processVehicleFolder(vehicleFolder) {
    const vehicleName = path.basename(vehicleFolder);
    const inputPath = path.join(INPUT_DIR, vehicleName);
    const outputPath = path.join(OUTPUT_DIR, vehicleName);

    console.log(`\n📁 Processing vehicle: ${vehicleName}`);

    // Create output directories
    const fullOutputPath = path.join(outputPath, 'full');
    const thumbOutputPath = path.join(outputPath, 'thumbnails');
    ensureDirectoryExists(fullOutputPath);
    ensureDirectoryExists(thumbOutputPath);

    // Get all image files
    const files = fs.readdirSync(inputPath)
        .filter(file => {
            const ext = path.extname(file).toLowerCase();
            return SUPPORTED_EXTENSIONS.includes(ext);
        })
        .sort(); // Sort to ensure consistent numbering

    if (files.length === 0) {
        console.log(`⚠️  No supported images found in ${vehicleName}`);
        return;
    }

    console.log(`Found ${files.length} images to process`);

    // Process each image
    for (let i = 0; i < files.length; i++) {
        const originalFile = files[i];
        const normalizedFile = normalizeFilename(normalizeExtension(originalFile));
        const sequenceNumber = i + 1;
        const newFilename = `${vehicleName}-${sequenceNumber}.jpg`;

        const inputFilePath = path.join(inputPath, originalFile);
        const outputFullPath = path.join(fullOutputPath, newFilename);
        const outputThumbPath = path.join(thumbOutputPath, newFilename);

        await processImage(inputFilePath, outputFullPath, outputThumbPath);
    }

    console.log(`✅ Completed processing ${vehicleName} (${files.length} images)`);
}

// Main processing function
async function processGallery() {
    console.log('🖼️  Starting gallery image processing...\n');

    // Check if input directory exists
    if (!fs.existsSync(INPUT_DIR)) {
        console.error(`❌ Input directory '${INPUT_DIR}' not found!`);
        console.log(`Please create the '${INPUT_DIR}' folder and add your vehicle folders with images.`);
        return;
    }

    // Ensure output directory exists
    ensureDirectoryExists(OUTPUT_DIR);

    // Get all vehicle folders
    const vehicleFolders = fs.readdirSync(INPUT_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    if (vehicleFolders.length === 0) {
        console.log(`⚠️  No vehicle folders found in '${INPUT_DIR}'`);
        console.log(`Please create folders like 'silver-audi-a4' with your images inside.`);
        return;
    }

    console.log(`Found ${vehicleFolders.length} vehicle folder(s): ${vehicleFolders.join(', ')}\n`);

    // Process each vehicle folder
    for (const vehicleFolder of vehicleFolders) {
        await processVehicleFolder(vehicleFolder);
    }

    console.log('\n🎉 Gallery processing complete!');
    console.log(`\n📁 Processed images are now in the '${OUTPUT_DIR}' folder`);
    console.log('🗑️  You can now safely delete the original images from gallery-raw');
}

// Run the script
if (require.main === module) {
    processGallery().catch(console.error);
}

module.exports = { processGallery };