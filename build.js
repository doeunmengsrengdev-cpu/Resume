/**
 * Modular Build Script for Portfolio & Resume
 * Stitches template.html + parts/*.html into Index.html
 * 
 * Usage:
 *   node build.js          Build once
 *   node build.js --watch  Watch files and rebuild on change
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const TEMPLATE_FILE = path.join(ROOT_DIR, 'template.html');
const OUTPUT_FILE = path.join(ROOT_DIR, 'Index.html');

function build() {
  const startTime = Date.now();
  if (!fs.existsSync(TEMPLATE_FILE)) {
    console.error(`Error: Template file ${TEMPLATE_FILE} not found.`);
    return false;
  }

  let html = fs.readFileSync(TEMPLATE_FILE, 'utf8');

  // Replace each <!-- @include filepath --> with content
  const includeRegex = /<!--\s*@include\s+([^\s]+)\s*-->/g;
  html = html.replace(includeRegex, (match, relPath) => {
    const fullPath = path.join(ROOT_DIR, relPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`Warning: Included file not found: ${fullPath}`);
      return `<!-- Missing include: ${relPath} -->`;
    }
    return fs.readFileSync(fullPath, 'utf8').trim();
  });

  fs.writeFileSync(OUTPUT_FILE, html);
  // Also keep lowercase index.html in sync for web servers
  const lowercaseIndex = path.join(ROOT_DIR, 'index.html');
  if (OUTPUT_FILE.toLowerCase() === lowercaseIndex.toLowerCase()) {
    // On case-insensitive macOS filesystem, Index.html and index.html refer to the same inode
  } else {
    fs.writeFileSync(lowercaseIndex, html);
  }

  const duration = Date.now() - startTime;
  console.log(`[build] Successfully compiled Index.html (${(html.length / 1024).toFixed(1)} KB) in ${duration}ms`);
  return true;
}

// Initial Build
build();

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('[watch] Watching template.html, parts/, css/, js/ for changes...');

  const watchDirs = [
    TEMPLATE_FILE,
    path.join(ROOT_DIR, 'parts'),
    path.join(ROOT_DIR, 'css'),
    path.join(ROOT_DIR, 'js')
  ];

  let debounceTimer = null;
  const triggerRebuild = (filename) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log(`[watch] Change detected in ${filename || 'files'}, rebuilding...`);
      build();
    }, 100);
  };

  watchDirs.forEach(target => {
    if (fs.existsSync(target)) {
      fs.watch(target, { recursive: true }, (eventType, filename) => {
        triggerRebuild(filename);
      });
    }
  });
}
