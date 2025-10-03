# 403 Forbidden Error Troubleshooting Guide

## Quick Diagnosis Steps

### 1. Check File Structure in cPanel File Manager
Your `public_html/` should look exactly like this:
```
public_html/
├── index.html          ← MUST be here (not in subfolder)
├── assets/             ← CSS/JS files
├── vite.svg
├── matthew.jpg
├── google/
│   └── api/
│       ├── auth.php
│       └── callback.php
└── .htaccess
```

### 2. Test Without .htaccess
1. **Rename `.htaccess` to `.htaccess-backup`**
2. **Try accessing your site**
3. **If it works** → The problem is in .htaccess
4. **If still 403** → Server configuration issue

### 3. Check File Permissions
In cPanel File Manager, right-click each file/folder and check permissions:
- **Folders**: 755 (public_html, assets, google)
- **Files**: 644 (index.html, .htaccess, all CSS/JS files)
- **PHP files**: 644 (auth.php, callback.php)

### 4. Test Direct File Access
Try these URLs directly:
- `https://esencemedia.info/index.html`
- `https://esencemedia.info/assets/` (should show directory listing or 403)
- `https://esencemedia.info/vite.svg`

### 5. Check Server Differences
Since you changed servers, check these common differences:

#### PHP Version
- **Old server**: PHP 7.x or 8.x?
- **New server**: Same version?
- **Fix**: Change PHP version in cPanel

#### Apache Modules
New server might be missing modules:
- `mod_rewrite` (for .htaccess)
- `mod_headers` (for security headers)

#### Directory Index Settings
Some servers don't have `index.html` as default:
- Check if `DirectoryIndex` is set properly

### 6. Server-Specific Issues

#### Cloudflare Settings (if using)
- Check SSL/TLS settings
- Disable "Always Use HTTPS" temporarily
- Check Page Rules

#### cPanel Settings
- Check "Index Manager" in cPanel
- Verify domain is pointing to correct directory
- Check if there are any IP restrictions

## Quick Fixes to Try

### Fix 1: Minimal .htaccess
Replace your .htaccess with this minimal version:
```apache
DirectoryIndex index.html
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Fix 2: Check PHP Configuration
If PHP files are causing issues, add to .htaccess:
```apache
AddHandler application/x-httpd-php .php
```

### Fix 3: Force Index File
Add this to .htaccess:
```apache
DirectoryIndex index.html index.htm index.php
```

## Diagnostic Commands

### Check Error Logs
1. **Go to cPanel → Error Logs**
2. **Look for recent 403 errors**
3. **Note the exact error message**

### Test File Accessibility
Create a simple test file:
```html
<!-- test.html -->
<!DOCTYPE html>
<html><body><h1>Test Page Works</h1></body></html>
```

Upload to `public_html/test.html` and try accessing it.

## Common Server Migration Issues

### 1. Different Apache Version
- **Old**: Apache 2.2
- **New**: Apache 2.4
- **Fix**: Update .htaccess syntax

### 2. Different PHP Handler
- **Old**: mod_php
- **New**: FastCGI/FPM
- **Fix**: Adjust file permissions

### 3. Security Modules
- **mod_security** might be blocking requests
- **Check**: cPanel → ModSecurity

### 4. File Ownership
- Files might be owned by wrong user
- **Fix**: Contact hosting provider

## Next Steps

1. **Try minimal .htaccess first**
2. **Check error logs for specific messages**
3. **Test with simple HTML file**
4. **Contact new hosting provider if server-level issue**

## Emergency Bypass
If nothing works, create this simple index.html:
```html
<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body>
    <h1>Server Test</h1>
    <p>If you see this, the server works.</p>
    <p>The issue is with your React app files.</p>
</body>
</html>
```

This will help isolate if it's a server issue or application issue.