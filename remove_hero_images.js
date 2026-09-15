const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Remove Waveform block
const waveformRegex = /<!-- Waveform Preview Graphic -->[\s\S]*?<p[^>]*>Frequency of Soul.*?<\/p>\s*<\/div>/i;
if (waveformRegex.test(html)) {
    html = html.replace(waveformRegex, '');
    console.log("Removed Waveform / Frequency of Soul image block.");
} else {
    console.log("Could not find Waveform block.");
}

// 2. Remove Floating Instruments Motif
const motifRegex = /<!-- Floating Instruments Motif -->[\s\S]*?<div class="absolute -bottom-6 -left-6[^>]*>[\s\S]*?<img alt="Musical Instruments Sketch"[^>]*>[\s\S]*?<\/div>/i;
if (motifRegex.test(html)) {
    html = html.replace(motifRegex, '');
    console.log("Removed Floating Instruments Motif block.");
} else {
    console.log("Could not find Floating Instruments Motif block.");
}

fs.writeFileSync(indexHtmlPath, html);
