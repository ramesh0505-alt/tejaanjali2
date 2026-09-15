const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// The logo is probably in a <nav> or <header> block. Let's look for "TEJANJALI" in a text element that acts as the brand.
// Without exact knowledge, let's inject a CSS class update or directly swap a known brand string.
// A common structure is <a href="#" class="text-2xl font-bold...">TEJANJALI</a>
// Let's replace the first instance of >TEJANJALI< or similar in the navbar.
// To be safe, I'll just write a script that looks for the Navbar brand.

const navbarBrandRegex = /<a[^>]*href=["'](?:#home|#|\/)["'][^>]*>\s*TEJANJALI\s*<\/a>/i;
if (navbarBrandRegex.test(html)) {
    const replacement = `<a href="#home" class="flex items-center gap-2">
        <img src="/images/logo.svg" alt="Tejanjali Logo" class="h-12 w-auto object-contain" />
    </a>`;
    html = html.replace(navbarBrandRegex, replacement);
    console.log("Successfully replaced textual logo with SVG logo in Navbar.");
} else {
    // Attempt 2: maybe it has span inside
    const fallbackRegex = /<a[^>]*href=["']#home["'][^>]*>[\s\S]*?TEJANJALI[\s\S]*?<\/a>/i;
    if (fallbackRegex.test(html)) {
        const replacement = `<a href="#home" class="flex items-center gap-2 z-50 relative hover:opacity-80 transition-opacity">
            <img src="/images/logo.svg" alt="Tejanjali Logo" class="h-14 w-auto object-contain drop-shadow-md" />
        </a>`;
        html = html.replace(fallbackRegex, replacement);
        console.log("Successfully replaced fallback textual logo with SVG logo in Navbar.");
    } else {
        console.log("Could not confidently find the Navbar logo text to replace.");
    }
}

fs.writeFileSync(indexHtmlPath, html);
