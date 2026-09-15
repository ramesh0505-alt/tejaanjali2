const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace the footer TEJANJALI text with the logo image
const footerLogoRegex = /<h2[^>]*>[\s\S]*?TEJANJALI[\s\S]*?<\/h2>/i;

if (footerLogoRegex.test(html)) {
    const replacement = `<div class="mb-4">
        <img src="/images/logo.svg" alt="Tejanjali Logo" class="h-24 w-auto object-contain" />
    </div>`;
    html = html.replace(footerLogoRegex, replacement);
    console.log("Successfully replaced footer textual logo with SVG logo.");
} else {
    console.log("Could not find footer logo text.");
}

fs.writeFileSync(indexHtmlPath, html);
