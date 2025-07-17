# Curated Cruiser - Mobile Auto Detailing

Professional mobile auto detailing services in Castro Valley and San Ramon, CA.

## Gallery Image Processing

This project includes an automated tool for processing gallery images for the vehicle galleries.

### How to Use

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create your input structure:**
   - Create a `gallery-raw` folder in the project root
   - Add vehicle folders inside `gallery-raw` (e.g., `gallery-raw/silver-audi-a4/`)
   - Place your images inside each vehicle folder

3. **Run the processing script:**
   ```bash
   npm run process-gallery
   ```

4. **Clean up:** Delete the original images from `gallery-raw/` after processing

### What the Script Does

The script will:
- Rename images to lowercase with vehicle prefix + sequence (e.g., `silver-audi-a4-1.jpg`)
- Convert JPEG extensions to JPG
- Create thumbnails (300px wide)
- Create optimized full-size images (max 1200px wide)
- Organize images into `gallery/[vehicle-name]/full/` and `gallery/[vehicle-name]/thumbnails/`

### Example Structure

```
gallery-raw/                    # Your input folder
├── silver-audi-a4/
│   ├── IMG_001.JPEG
│   ├── IMG_002.JPEG
│   └── ...
└── black-bmw-3series/
    ├── photo1.jpg
    └── ...

# After processing:
gallery/                        # Generated output
├── silver-audi-a4/
│   ├── full/                   # Full-size images
│   │   ├── silver-audi-a4-1.jpg
│   │   └── ...
│   └── thumbnails/             # Thumbnail images
│       ├── silver-audi-a4-1.jpg
│       └── ...
└── black-bmw-3series/
    ├── full/
    └── thumbnails/
```

## Image Processing

This project includes an automated image processor that creates optimized versions of images for responsive web design.

### Setup

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. The image processor uses the `sharp` library for high-performance image processing.

### Usage

#### Process All Images
To process all images in the `img/src` directory:
```bash
npm run process-images
```

#### Watch for New Images
To automatically process new images as they're added to `img/src`:
```bash
npm run watch-images
```

#### Manual Processing
You can also run the processor directly:
```bash
node tools/image-processor.js
node tools/image-processor.js --watch
```

#### Windows Users
For Windows users, you can also double-click `tools/process-images.bat` to run the processor.

### Image Sizes

The processor creates three optimized versions of each image:

- **Small**: 400px width (for mobile devices)
- **Medium**: 800px width (for tablets)
- **Large**: 1200px width (for desktop)

### Supported Formats

- JPG/JPEG
- PNG
- WebP

### File Structure

```
img/
├── src/           # Original images (add new images here)
├── processed/     # Optimized images (auto-generated)
└── *.png         # Logo files
```

### How It Works

1. Place your original images in the `img/src` directory
2. Run the image processor
3. Optimized versions are automatically created in `img/src/processed`
4. Use the processed images in your HTML with responsive `srcset` attributes

### Example HTML Usage

```html
<img src="img/src/your-image.jpg" 
     srcset="img/processed/your-image-small.jpg 400w,
             img/processed/your-image-medium.jpg 800w,
             img/processed/your-image-large.jpg 1200w"
     sizes="(max-width: 600px) 400px,
            (max-width: 1200px) 800px,
            1200px"
     alt="Description" />
```

### Features

- **Smart Caching**: Only processes images that have changed
- **Aspect Ratio Preservation**: Maintains original image proportions
- **Quality Optimization**: Uses 85% JPEG quality for optimal file size
- **Progressive JPEGs**: Creates progressive JPEGs for faster loading
- **Automatic Directory Creation**: Creates processed directory if it doesn't exist

### Deployment

This website is designed to be deployed to GitHub Pages. The image processor is a development tool - all processed images should be committed to the repository for deployment. 