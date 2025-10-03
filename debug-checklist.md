# Debug Checklist for cPanel Deployment

## Step 1: Check File Structure
In cPanel File Manager, your `public_html/` should contain:

```
public_html/
├── index.html ← This MUST exist
├── assets/
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── vendor-[hash].js
├── vite.svg
├── matthew.jpg
├── google/
│   └── api/
│       └── auth.php
└── .htaccess
```

## Step 2: Verify index.html
- Open `index.html` in cPanel
- It should contain `<div id="root"></div>`
- It should reference files in `/assets/`

## Step 3: Check Permissions
- Files: 644
- Folders: 755

## Step 4: Test Without .htaccess
1. Rename `.htaccess` to `.htaccess-backup`
2. Test your site
3. If it works, the issue was in .htaccess

## Step 5: Check Error Logs
In cPanel, check "Error Logs" for specific error messages.

## Step 6: Manual Test
Try accessing: `https://esencemedia.info/index.html` directly

## Common Issues:
1. **Missing index.html** - Most common cause
2. **Wrong file permissions** - 666 instead of 644
3. **Corrupted .htaccess** - Contains React code instead of Apache rules
4. **Files still in dist/ folder** - Not moved to root
5. **Missing assets/ folder** - CSS/JS files not uploaded

## Quick Fix:
If nothing works, delete everything and re-upload ONLY:
1. Contents of `dist/` folder (after running `npm run build`)
2. `matthew.jpg`
3. `google/` folder
4. Clean `.htaccess` file