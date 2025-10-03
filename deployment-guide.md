# cPanel Deployment Guide

## The Problem
Your `.htaccess` file contained React component code instead of Apache directives, causing 403 errors.

## What to Upload to cPanel

After running `npm run build`, upload these files from the `dist/` folder to your cPanel `public_html/`:

### Required Files:
```
public_html/
├── index.html (from dist/)
├── assets/ (entire folder from dist/)
├── vite.svg (from dist/)
├── .htaccess (fixed version)
├── matthew.jpg
├── google/
│   └── api/
│       ├── auth.php
│       └── callback.php (if you have it)
```

## Step-by-Step:
1. **Build locally:** `npm run build`
2. **Upload dist contents** to `public_html/`
3. **Upload additional files:**
   - `matthew.jpg` → `public_html/matthew.jpg`
   - `google/` folder → `public_html/google/`
   - Fixed `.htaccess` → `public_html/.htaccess`

## File Permissions:
- **Folders:** 755
- **Files:** 644
- **PHP files:** 644

## Don't Upload:
- `src/` folder
- `node_modules/`
- `package.json`
- Development files

## Test:
After upload, your site should load at your domain. The `.htaccess` now contains proper Apache rules instead of React code.