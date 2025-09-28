const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create a zip file with all project files
const output = fs.createWriteStream('calendly-project.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

output.on('close', function() {
  console.log('Project exported successfully!');
  console.log(archive.pointer() + ' total bytes');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Add all files except node_modules and .git
archive.glob('**/*', {
  ignore: ['node_modules/**', '.git/**', '*.zip', 'download-project.js']
});

archive.finalize();