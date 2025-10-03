# cPanel Deployment Fix

## The Problem
You uploaded the `dist` folder itself instead of its contents. The 500 error happens because you're accessing `/dist` as a URL.

## Correct Structure

### What you currently have:
```
public_html/
└── dist/
    ├── index.html
    ├── assets/
    └── other files...
```

### What you should have:
```
public_html/
├── index.html (from dist/)
├── assets/ (from dist/)
├── vite.svg (from dist/)
├── matthew.jpg
├── google/
│   └── api/
│       └── auth.php
└── .htaccess
```

## How to Fix:

### Option 1: Move Files (Recommended)
1. **Go to cPanel File Manager**
2. **Navigate to public_html/**
3. **Go into the dist/ folder**
4. **Select ALL files inside dist/**
5. **Cut/Move them to public_html/ (parent directory)**
6. **Delete the empty dist/ folder**

### Option 2: Re-upload Correctly
1. **Download the dist/ folder from your server**
2. **Delete everything in public_html/**
3. **Upload the CONTENTS of dist/ (not the folder itself)**
4. **Add your additional files (matthew.jpg, google/, .htaccess)**

## After Fix:
- Your site should load at: `https://esencemedia.info/`
- NOT: `https://esencemedia.info/dist`

## File Permissions:
- Folders: 755
- Files: 644

## Test:
After moving files, visit `https://esencemedia.info/` - it should work!