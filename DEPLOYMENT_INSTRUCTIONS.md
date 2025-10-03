# cPanel Deployment Fix for 403 Forbidden Error

## Current Issue
Your website at `https://esencemedia.info/` is showing a 403 Forbidden error. This typically means the files aren't properly deployed to cPanel.

## Step-by-Step Fix

### 1. Build the Project Locally
```bash
npm run build
```

### 2. Check Your cPanel File Structure
In cPanel File Manager, your `public_html/` folder should look like this:

```
public_html/
├── index.html          ← MUST be here (from dist/)
├── assets/             ← Entire folder from dist/
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── vendor-[hash].js
├── vite.svg           ← From dist/
├── matthew.jpg        ← Your profile image
├── google/            ← Your Google auth folder
│   └── api/
│       └── auth.php
└── .htaccess          ← Fixed version below
```

### 3. Correct .htaccess File
Create/replace your `.htaccess` file with this content:

```apache
# Enable rewrite engine
RewriteEngine On

# Handle React Router - redirect all requests to index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

### 4. Set Correct File Permissions
In cPanel File Manager:
- **Folders**: 755 (including public_html, assets, google)
- **Files**: 644 (including index.html, .htaccess, all CSS/JS files)
- **PHP files**: 644

### 5. Common Mistakes to Avoid

❌ **Don't do this:**
- Upload the `dist/` folder itself
- Leave files in a subfolder
- Use 666 permissions on files
- Include React code in .htaccess

✅ **Do this:**
- Upload the CONTENTS of the `dist/` folder
- Put files directly in `public_html/`
- Use 644 for files, 755 for folders
- Use proper Apache directives in .htaccess

### 6. Verification Steps

1. **Check index.html exists**: `public_html/index.html` should be present
2. **Check assets folder**: `public_html/assets/` should contain CSS and JS files
3. **Test direct access**: Try `https://esencemedia.info/index.html`
4. **Check error logs**: Look at cPanel Error Logs for specific errors

### 7. If Still Not Working

If you're still getting 403 errors:

1. **Temporarily rename .htaccess** to `.htaccess-backup`
2. **Test the site** - if it works, the issue is in .htaccess
3. **Check file ownership** - files should be owned by your cPanel user
4. **Contact your hosting provider** - they may have specific restrictions

## Quick Test
After making these changes, your site should load at:
- `https://esencemedia.info/` ✅
- `https://esencemedia.info/index.html` ✅

The calendar booking interface should appear with the EssenceMedia branding and Matthew Mee's profile.