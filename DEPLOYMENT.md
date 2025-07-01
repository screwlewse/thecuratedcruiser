# GitHub Pages Deployment Guide

## Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Git**: Install Git on your local machine
3. **Node.js**: Required for image processing (already installed)

## Deployment Steps

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `curated-cruiser-website` or `your-username.github.io`
3. Make it public (required for GitHub Pages)

### 2. Initialize Git and Push Code

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Curated Cruiser website"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/your-username/your-repo-name.git

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/(root)** folder
6. Click **Save**

### 4. Verify Deployment

- Your site will be available at: `https://your-username.github.io/your-repo-name`
- It may take a few minutes for the first deployment

## Important Notes

### Image Processing
- **Before deploying**: Run `npm run process-images` to ensure all processed images are up to date
- **Processed images are included**: The `img/processed/` folder is committed to the repository so GitHub Pages can serve the optimized images

### File Structure for GitHub Pages
```
your-repo/
├── index.html          # Main page
├── styles.css          # Styles
├── scripts.js          # JavaScript
├── mobile.js           # Mobile JavaScript
├── img/
│   ├── src/            # Original images
│   ├── processed/      # Optimized images (committed)
│   └── *.png          # Logo files
├── tools/              # Development tools
└── node_modules/       # Dependencies (ignored)
```

### Custom Domain (Optional)
If you have a custom domain:
1. Add a `CNAME` file to your repository root with your domain
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use custom domain

## Troubleshooting

### Images Not Loading
- Ensure `img/processed/` folder is committed to the repository
- Check that image paths in HTML are correct
- Verify processed images exist for all referenced images

### Site Not Updating
- GitHub Pages can take 5-10 minutes to update
- Check the **Actions** tab in your repository for deployment status
- Ensure you're pushing to the correct branch

### Performance Issues
- All images are optimized and should load quickly
- Consider using a CDN for even better performance 