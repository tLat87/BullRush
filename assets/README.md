# Assets Folder

This folder contains all the background images and other assets for the Bull's Eye Rush game.

## Background Images

To add a background image for all screens:

1. Place your background image file in this folder
2. Name it `background.png` (or update the path in BackgroundImage.tsx)
3. The image should be optimized for mobile screens (recommended: 1080x1920 or similar aspect ratio)

## Current Background Setup

The app is currently configured to use:
- `background.png` as the main background image
- Fallback gradient if image is not found
- Cherry blossom and lantern decorations overlaid on the background

## Supported Image Formats

- PNG (recommended for transparency)
- JPG
- WebP

## Image Optimization Tips

- Use appropriate resolution for mobile screens
- Compress images to reduce app size
- Consider using different images for different screen densities (1x, 2x, 3x)

