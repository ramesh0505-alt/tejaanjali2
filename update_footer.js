const fs = require('fs');
const path = require('path');

const htmlFile = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(htmlFile, 'utf8');

// 1. Inject missing fonts
if (!html.includes('Great+Vibes')) {
  html = html.replace(
    '</title>',
    '</title>\n    <!-- Google Fonts: Great Vibes & Montserrat -->\n    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">'
  );
}

// 2. Inject Tailwind Config for the footer
if (html.includes('tailwind.config')) {
  // Inject script font
  if (!html.includes('script:')) {
    html = html.replace(
      /fontFamily:\s*\{/,
      `fontFamily: {\n            script: ['"Great Vibes"', 'cursive'],`
    );
  }
  
  // Inject new brand colors into the existing brand block
  if (!html.includes("bgDark: '#080505'")) {
    html = html.replace(
      /brand:\s*\{/,
      `brand: {
              bg: '#0f0a09',
              bgDark: '#080505',
              terracotta: '#b75d45',
              terracottaHover: '#c76950',
              cream: '#f2e9dc',
              muted: '#b9aaa0',
              subtle: '#7a6e67',
              borderBronze: 'rgba(180, 130, 55, 0.22)',`
    );
  }
}

// 3. Inject Custom Styles
if (!html.includes('stage-glow')) {
  html = html.replace(
    '</head>',
    `
  <style data-purpose="custom-typography">
    .font-editorial { font-family: 'Playfair Display', Georgia, serif; letter-spacing: 0.18em; }
    .font-quote { font-family: 'Cormorant Garamond', Georgia, serif; }
    .font-calligraphy { font-family: 'Great Vibes', cursive; }
  </style>
  <style data-purpose="visual-effects">
    .stage-glow { background: radial-gradient(ellipse at 85% 45%, rgba(220, 140, 80, 0.22) 0%, rgba(160, 85, 45, 0.12) 35%, rgba(12, 9, 10, 0) 70%); }
    .footer-ambient { background: radial-gradient(circle at 18% 85%, rgba(183, 93, 69, 0.08) 0%, transparent 55%), radial-gradient(circle at 88% 50%, rgba(195, 115, 60, 0.14) 0%, transparent 65%), linear-gradient(180deg, #130d0e 0%, #0a0708 100%); }
    .wave-mask { mask-image: linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.1)); -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.1)); }
  </style>
</head>`
  );
}

// 4. Replace the old footer
const newFooter = `
<!-- BEGIN: MainFooter -->
<footer class="relative w-full overflow-hidden footer-ambient border-t border-brand-borderBronze text-[#b9aaa0]" data-purpose="artist-footer">
<!-- Stage Spotlight & Atmospheric Backing on Right Side -->
<div aria-hidden="true" class="pointer-events-none absolute inset-0 stage-glow z-0"></div>
<!-- Main Content Container -->
<div class="relative z-10 max-w-[1720px] mx-auto pt-16 pb-10 px-8 sm:px-12 lg:px-20">
<!-- BEGIN: 4-Column Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start pb-16">
<!-- Column 1: Brand & Philosophy (span 4) -->
<div class="lg:col-span-4 flex flex-col pr-0 lg:pr-8" data-purpose="brand-summary">
<!-- Artist Name -->
<h2 class="text-white text-3xl sm:text-4xl font-editorial font-bold tracking-[0.22em] uppercase mb-2">
            TEJANJALI
          </h2>
<!-- Profession Sub-heading -->
<p class="text-brand-terracotta text-[11px] sm:text-xs font-semibold tracking-[0.26em] uppercase mb-5">
            SINGER • LYRICIST • COMPOSER • PERFORMER
          </p>
<!-- Core Philosophy Statement -->
<p class="text-brand-muted text-sm sm:text-[15px] font-normal leading-relaxed max-w-sm mb-6">
            Music, expression and performance in one artistic journey.
          </p>
<!-- Musical Clef & Motto Ornament -->
<div class="flex items-center gap-3 text-brand-muted/90 mb-6" data-purpose="clef-motto">
<!-- Clef Icon -->
<img alt="Clef" class="w-4 h-8 object-contain brightness-125 filter drop-shadow-[0_0_6px_rgba(213,168,58,0.35)] opacity-85" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQA8NbmndLmX8dGrCqebZDD6D1qKXV5rT26rIIu2fnjlsyS8vihY22UzOMYl7I0w9R88y8bL51revWQBdSGor-Q7m5HcZWGpyeeCwDHqC7ooDBV1s3scktn80Pstemw5HUxknXF5Ufd2786rX3c-pSo9tLmuV2-ufSWDR9KIsCns48Zm8miXm6Wm-wcqH4LPRTH3lncUu2qxiI_QtJirPgHPJg3WNr8hkHxRcH7opSI_HCQtEM6KuDrcyAff-6IHdtdWA"/>
<!-- Horizontal Dash & Phrase -->
<div class="flex items-center gap-2.5">
<span class="w-7 h-[1px] bg-brand-muted/40 inline-block"></span>
<span class="font-quote italic text-base sm:text-lg text-brand-cream/90 tracking-wide">
                Music Connects People
              </span>
<span class="w-7 h-[1px] bg-brand-muted/40 inline-block"></span>
</div>
</div>
<!-- Subtle Wave Artwork under text -->
<div aria-hidden="true" class="w-full max-w-xs opacity-45 pointer-events-none mt-2">
<svg class="w-full h-auto" fill="none" viewbox="0 0 320 40" xmlns="http://www.w3.org/2000/svg">
<path d="M0 25C40 25 60 10 100 12C140 14 160 30 200 28C240 26 260 8 320 18" stroke="#d5a83a" stroke-dasharray="2 3" stroke-width="0.8"></path>
<path d="M0 28C50 28 80 18 130 20C180 22 210 35 270 24C290 20 310 16 320 22" stroke="#b75d45" stroke-width="0.6"></path>
<path d="M0 20C60 20 90 6 150 14C210 22 230 32 320 14" stroke="#e0be75" stroke-opacity="0.6" stroke-width="0.4"></path>
</svg>
</div>
</div>
<!-- END: Column 1 -->
<!-- Column 2: Explore Navigation (span 2) -->
<div class="lg:col-span-2" data-purpose="footer-navigation">
<h3 class="text-brand-cream text-xs font-semibold tracking-[0.24em] uppercase mb-6">
            EXPLORE
          </h3>
<ul class="space-y-2.5 text-sm tracking-wide">
<li><a class="hover:text-white transition-colors duration-200" href="#home">Home</a></li>
<li><a class="hover:text-white transition-colors duration-200" href="#about">About</a></li>
<li><a class="hover:text-white transition-colors duration-200" href="#journey">Journey</a></li>
<li><a class="hover:text-white transition-colors duration-200" href="#artistry">Artistry</a></li>
<li><a class="hover:text-white transition-colors duration-200" href="#music">Music</a></li>
<li><a class="hover:text-white transition-colors duration-200" href="#projects">Projects</a></li>
<li><a class="hover:text-white transition-colors duration-200" href="#gallery">Gallery</a></li>
<li><a class="hover:text-white transition-colors duration-200" href="#testimonials">Testimonials</a></li>
<li><a class="hover:text-white transition-colors duration-200" href="#contact">Contact</a></li>
</ul>
</div>
<!-- END: Column 2 -->
<!-- Column 3: Connect & Quote (span 3) -->
<div class="lg:col-span-3 flex flex-col pr-0 lg:pr-4" data-purpose="social-and-quote">
<h3 class="text-brand-cream text-xs font-semibold tracking-[0.24em] uppercase mb-3">
            CONNECT
          </h3>
<p class="text-brand-muted text-sm leading-relaxed mb-6">
            Follow Tejanjali’s musical journey across platforms.
          </p>
<!-- Social Media Outlined Circular Icons -->
<div class="flex items-center gap-3.5 mb-8" data-purpose="social-links">
<!-- Instagram -->
<a aria-label="Follow on Instagram" class="w-10 h-10 rounded-full border border-[#8a5d48]/60 flex items-center justify-center text-brand-cream hover:border-brand-terracotta hover:text-brand-terracotta hover:scale-105 transition-all" href="https://instagram.com" rel="noopener noreferrer" target="_blank">
<svg class="w-4 h-4" fill="currentColor" viewbox="0 0 24 24">
<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
</svg>
</a>
<!-- YouTube -->
<a aria-label="Subscribe on YouTube" class="w-10 h-10 rounded-full border border-[#8a5d48]/60 flex items-center justify-center text-brand-cream hover:border-brand-terracotta hover:text-brand-terracotta hover:scale-105 transition-all" href="https://youtube.com" rel="noopener noreferrer" target="_blank">
<svg class="w-4 h-4" fill="currentColor" viewbox="0 0 24 24">
<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
</svg>
</a>
<!-- Spotify -->
<a aria-label="Listen on Spotify" class="w-10 h-10 rounded-full border border-[#8a5d48]/60 flex items-center justify-center text-brand-cream hover:border-brand-terracotta hover:text-brand-terracotta hover:scale-105 transition-all" href="https://spotify.com" rel="noopener noreferrer" target="_blank">
<svg class="w-4 h-4" fill="currentColor" viewbox="0 0 24 24">
<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.503 17.308c-.215.354-.676.467-1.03.251-2.822-1.724-6.375-2.114-10.559-1.158-.403.092-.806-.157-.899-.56-.092-.403.157-.807.56-.899 4.582-1.048 8.514-.606 11.677 1.336.354.216.467.677.251 1.03zm1.469-3.264c-.27.44-.85.577-1.29.307-3.23-1.986-8.156-2.56-11.977-1.4-11.977-1.4-.499.151-1.025-.133-1.176-.632-.151-.499.133-1.025.632-1.176 4.375-1.328 9.807-.687 13.504 1.588.44.27.577.85.307 1.29zm.126-3.41c-3.874-2.301-10.264-2.513-13.972-1.387-.594.18-1.222-.155-1.402-.749-.18-.594.155-1.222.749-1.402 4.267-1.296 11.325-1.047 15.795 1.606.535.317.709 1.011.392 1.546-.317.534-1.011.708-1.562.386z"></path>
</svg>
</a>
<!-- Facebook -->
<a aria-label="Connect on Facebook" class="w-10 h-10 rounded-full border border-[#8a5d48]/60 flex items-center justify-center text-brand-cream hover:border-brand-terracotta hover:text-brand-terracotta hover:scale-105 transition-all" href="https://facebook.com" rel="noopener noreferrer" target="_blank">
<svg class="w-4 h-4" fill="currentColor" viewbox="0 0 24 24">
<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
</svg>
</a>
<!-- X / Twitter -->
<a aria-label="Follow on X" class="w-10 h-10 rounded-full border border-[#8a5d48]/60 flex items-center justify-center text-brand-cream hover:border-brand-terracotta hover:text-brand-terracotta hover:scale-105 transition-all" href="https://twitter.com" rel="noopener noreferrer" target="_blank">
<svg class="w-3.5 h-3.5" fill="currentColor" viewbox="0 0 24 24">
<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
</svg>
</a>
</div>
<!-- Divider Line -->
<hr class="border-t border-brand-muted/20 w-16 mb-6"/>
<!-- Philosophical Quote -->
<blockquote class="font-quote italic text-brand-cream/85 text-[15px] sm:text-base leading-relaxed mb-3">
            “Music gives a soul to the universe, wings to the mind and life to everything.”
          </blockquote>
<cite class="text-[11px] uppercase tracking-[0.24em] text-brand-muted/70 not-italic">
            — PLATO
          </cite>
</div>
<!-- END: Column 3 -->
<!-- Column 4: Call to Action & Stage Image Artwork (span 3) -->
<div class="lg:col-span-3 flex flex-col justify-between relative" data-purpose="cta-and-visual">
<!-- Text and CTA Box -->
<div class="relative z-10">
<h3 class="text-brand-cream text-xs font-semibold tracking-[0.22em] uppercase mb-3">
              LET’S CREATE SOMETHING MUSICAL
            </h3>
<p class="text-brand-muted text-sm leading-relaxed mb-6 max-w-xs">
              For performances, collaborations, creative projects and professional enquiries.
            </p>
<!-- Primary Action Button -->
<a class="inline-flex items-center justify-center px-6 py-3 bg-[#a8583c] hover:bg-[#b75d45] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded transition-all duration-200 shadow-lg shadow-black/40 group" href="#contact">
<span>CONTACT TEJANJALI</span>
<span class="ml-2 font-normal text-sm group-hover:translate-x-1 transition-transform">&gt;</span>
</a>
</div>
<!-- Live Stage Performer Visual Blend on Right -->
<div aria-hidden="true" class="absolute -right-6 -bottom-16 w-64 sm:w-72 md:w-80 h-80 pointer-events-none select-none opacity-80 mix-blend-screen overflow-hidden hidden lg:block">
<!-- Artist Portrait Singing -->
<img alt="" class="w-full h-full object-cover object-top filter contrast-125 sepia-[0.35] hue-rotate-[335deg] mask-radial" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYiHIMk1p5u5iEAZIvOQNlxbPD_opS1FVmiU-M9RmuGPg6ueuHor7htO4qpW4OtkukV6g7MxS03Txtb1YJkZtq_K1G111w3yYrLQl2V5BlzM2N1W9cqWRPqfw2qAhVmc6LuvRcWOXN_fDz5ufV-Nq7d7ehsWjXgfO3PUr4Jb4OxT5fU92sBDyw9AQE0UlpmgcjhzxF5MpAK_p1j-ehCCAzHBaTxKAhI4uOuFMr9gZTbS-Es8oTgNvx2YG98erBkcRa93Y" style="mask-image: radial-gradient(circle at 65% 45%, black 40%, transparent 80%); -webkit-mask-image: radial-gradient(circle at 65% 45%, black 40%, transparent 80%);"/>
<!-- Elegant Handwriting Signature Overlay -->
<div class="absolute bottom-10 right-6 text-right leading-none text-brand-cream/40 font-calligraphy text-2xl tracking-widest transform -rotate-12">
<p>Live</p>
<p class="mr-2">Create</p>
<p class="mr-4">Inspire</p>
</div>
</div>
</div>
<!-- END: Column 4 -->
</div>
<!-- END: 4-Column Grid Layout -->
<!-- BEGIN: Bottom Bar / Sub-footer -->
<div class="border-t border-brand-muted/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-wider" data-purpose="sub-footer">
<!-- Copyright Notice -->
<p class="text-[#8a7b74]">
          © 2026 TEJANJALI. All Rights Reserved.
        </p>
<!-- Legal Links & Tagline -->
<div class="flex items-center gap-6">
<div class="flex items-center gap-5 text-brand-muted/80">
<a class="hover:text-brand-cream transition-colors" href="#privacy">Privacy Policy</a>
<a class="hover:text-brand-cream transition-colors" href="#terms">Terms</a>
</div>
<!-- Subtle Divider -->
<span class="w-10 h-[1px] bg-brand-muted/30 hidden sm:inline-block"></span>
<!-- Signature Statement -->
<span class="font-quote italic text-sm text-brand-muted/90 tracking-normal">
            Made for Music.
          </span>
</div>
</div>
<!-- END: Bottom Bar -->
</div>
</footer>
<!-- END: MainFooter -->
`;

const regex = /<!-- BEGIN: MainFooter -->[\s\S]*?<!-- END: MainFooter -->/;
if (regex.test(html)) {
  html = html.replace(regex, newFooter.trim());
  console.log("Successfully replaced footer section.");
} else {
  console.log("Could not find footer section markers.");
}

fs.writeFileSync(htmlFile, html);
console.log("Done updating index.html");
