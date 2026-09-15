const fs = require('fs');
const path = require('path');

const htmlFile = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(htmlFile, 'utf8');

// 1. Inject fonts if missing
if (!html.includes('Cormorant+Garamond')) {
  html = html.replace(
    '</title>',
    '</title>\n    <!-- Google Fonts: Playfair Display & Cormorant Garamond -->\n    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:wght@600;700;800;900&display=swap" rel="stylesheet">'
  );
}

// 2. Inject Tailwind config additions safely
if (html.includes('tailwind.config') && !html.includes('terracotta')) {
  // Inject fonts
  html = html.replace(
    /fontFamily:\s*\{/,
    `fontFamily: {
            serif: ['"Playfair Display"', 'Georgia', 'serif'],
            cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],`
  );
  
  // Inject colors
  html = html.replace(
    /colors:\s*\{/,
    `colors: {
            gold: {
              300: '#edd89f',
              400: '#e5b85e',
              500: '#d5a83a',
              600: '#b88928',
            },
            terracotta: '#c97852',
            ivory: '#f5eee3',
            mutedBronze: 'rgba(180, 130, 55, 0.45)',`
  );
  
  // Inject boxShadow
  html = html.replace(
    /boxShadow:\s*\{/,
    `boxShadow: {
            'gold-glow': '0 0 35px -5px rgba(213, 168, 58, 0.42)',
            'card-inset': 'inset 0 0 20px rgba(0, 0, 0, 0.65)',`
  );
}

// 3. Inject Custom Styles
if (!html.includes('banner-atmosphere')) {
  html = html.replace(
    '</head>',
    `
  <style data-purpose="custom-styling">
    .banner-atmosphere {
      background: radial-gradient(circle at 12% 35%, rgba(224, 153, 56, 0.22) 0%, rgba(135, 76, 23, 0.12) 32%, transparent 68%),
                  radial-gradient(circle at 88% 70%, rgba(180, 110, 45, 0.08) 0%, transparent 50%),
                  #0e0a0b;
    }
    .spotlight-beam {
      background: radial-gradient(ellipse at 16% 18%, rgba(245, 205, 120, 0.45) 0%, rgba(200, 140, 50, 0.18) 38%, transparent 65%);
    }
    .card-scrim {
      background: linear-gradient(180deg, rgba(16, 12, 13, 0.4) 0%, rgba(14, 10, 11, 0.88) 65%, rgba(10, 7, 8, 0.98) 100%);
    }
    .tapered-line-left {
      background: linear-gradient(90deg, transparent, rgba(185, 145, 78, 0.65));
    }
    .tapered-line-right {
      background: linear-gradient(90deg, rgba(185, 145, 78, 0.65), transparent);
    }
  </style>
</head>`
  );
}

// 4. Replace the old section
const newSection = `
<!-- BEGIN: ContactBookingSection -->
<section id="contact" class="py-20 flex justify-center px-4 md:px-8 bg-[#09080d]">
<!-- BEGIN: Main Collaboration Banner Container -->
<main class="relative w-full max-w-[1360px] rounded-[30px] border border-mutedBronze banner-atmosphere overflow-hidden shadow-2xl p-7 sm:p-12 lg:p-16 flex flex-col items-center" data-purpose="booking-hero-banner">
<!-- Ambient spotlight glow & golden atmosphere -->
<div aria-hidden="true" class="pointer-events-none absolute inset-0 spotlight-beam z-0 opacity-80 mix-blend-screen"></div>
<!-- Atmospheric vintage microphone & floating music staff graphics on the left -->
<div aria-hidden="true" class="pointer-events-none absolute left-[-20px] top-[-10px] w-[460px] h-[520px] z-0 opacity-45 mix-blend-screen hidden md:block">
<svg class="w-full h-full" fill="none" viewbox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
<!-- Musical staff lines radiating -->
<path d="M-50 290 Q 90 270 210 320 T 420 310 T 580 340" fill="none" stroke="rgba(235, 185, 95, 0.45)" stroke-width="1.2"></path>
<path d="M-50 305 Q 90 285 210 335 T 420 325 T 580 355" fill="none" stroke="rgba(235, 185, 95, 0.4)" stroke-width="1.2"></path>
<path d="M-50 320 Q 90 300 210 350 T 420 340 T 580 370" fill="none" stroke="rgba(235, 185, 95, 0.35)" stroke-width="1.2"></path>
<path d="M-50 335 Q 90 315 210 365 T 420 355 T 580 385" fill="none" stroke="rgba(235, 185, 95, 0.3)" stroke-width="1.2"></path>
<path d="M-50 350 Q 90 330 210 380 T 420 370 T 580 400" fill="none" stroke="rgba(235, 185, 95, 0.25)" stroke-width="1.2"></path>
<!-- Glowing musical notes -->
<g fill="rgba(245, 205, 120, 0.75)" filter="drop-shadow(0 0 6px rgba(240, 190, 80, 0.8))">
<circle cx="160" cy="305" r="4.5"></circle>
<path d="M164 305 L164 275 L180 278 L180 288 L164 285" fill="rgba(245, 205, 120, 0.85)"></path>
<circle cx="270" cy="318" r="5"></circle>
<path d="M275 318 L275 285 L310 275 L310 305" fill="none" stroke="rgba(245, 205, 120, 0.85)" stroke-width="2"></path>
<circle cx="310" cy="305" r="5"></circle>
<circle cx="390" cy="325" r="4"></circle>
<path d="M394 325 L394 295" stroke="rgba(245, 205, 120, 0.8)" stroke-width="2"></path>
</g>
<!-- Dynamic bokeh particles -->
<circle cx="180" cy="220" fill="#ffdf99" opacity="0.6" r="3"></circle>
<circle cx="120" cy="360" fill="#ffbe6b" opacity="0.5" r="2.5"></circle>
<circle cx="340" cy="260" fill="#ffd980" opacity="0.5" r="2"></circle>
<circle cx="230" cy="410" fill="#ffaa4d" opacity="0.4" r="3.5"></circle>
</svg>
</div>
<!-- BEGIN: Top Decorative Clef Emblem -->
<header class="relative z-10 flex flex-col items-center w-full max-w-4xl" data-purpose="banner-header">
<div class="flex items-center justify-center w-full gap-4 mb-5" data-purpose="clef-divider">
<span class="h-[1px] w-28 sm:w-44 tapered-line-left"></span>
<div class="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[rgba(215,168,75,0.45)] bg-[#1c1412]/80 flex items-center justify-center shadow-[0_0_15px_rgba(200,135,45,0.25)]">
<!-- Elegant Musical Treble Clef -->
<svg class="w-5 h-5 text-gold-400 fill-current" viewbox="0 0 24 24">
<path d="M12.8 2.2c-.4 0-.8.3-.9.7-.5 1.7-1.1 3.7-1.3 5.4-.1.8-.2 1.6-.2 2.3-.5-.4-1.2-.6-1.8-.5-1.5.2-2.5 1.5-2.4 3 .1 1.4 1.1 2.5 2.5 2.6 1.4.1 2.7-.8 3-2.1.2-.8.2-1.8.2-2.9.1-1.3.4-2.8.8-4.2.3 1.5.5 3.3.5 5 0 .9-.1 1.9-.3 2.8-.7 2.6-2.5 4.7-3.9 6.8-.7 1.1-1.4 2.2-1.7 3.5-.4 1.5.1 3.2 1.4 4.1 1.2.9 3 .8 4.1-.2 1.2-1 1.7-2.6 1.4-4.1-.3-1.4-1.3-2.5-2.7-2.8l-.3 1.2c.8.2 1.4.9 1.6 1.7.2.9-.1 1.8-.8 2.4-.7.6-1.7.7-2.4.1-.7-.5-1-1.5-.7-2.3.2-.8.7-1.5 1.2-2.3 1.5-2.2 3.5-4.4 4.3-7.2.3-1.1.4-2.3.4-3.5 0-2.2-.4-4.4-.9-6.5l-.2-.9h-.4zm-2.4 11.2c0 1.2-.1 2.1-.3 2.7-.3.9-1.2 1.5-2.2 1.4-1-.1-1.7-.9-1.8-1.9-.1-1.1.6-2.1 1.7-2.2.5 0 1 .2 1.4.6.4.4.8.8 1.2 1.4v-2z"></path>
</svg>
</div>
<span class="h-[1px] w-28 sm:w-44 tapered-line-right"></span>
</div>
<!-- Eyebrow Sub-heading -->
<span class="text-[11px] sm:text-xs font-semibold tracking-[0.28em] text-[#dfa94b] uppercase mb-4 text-center">
        COLLABORATION • LIVE BOOKINGS
      </span>
<!-- Main Headline in Luxury Editorial Serif -->
<h1 class="text-center font-serif text-3xl sm:text-5xl lg:text-[62px] leading-[1.08] font-bold tracking-tight">
<span class="block text-ivory drop-shadow-sm">LET’S CREATE</span>
<span class="block text-terracotta mt-1 sm:mt-2 tracking-wide font-normal drop-shadow-sm">SOMETHING MUSICAL</span>
</h1>
<!-- Subtitle Description Text -->
<p class="mt-5 sm:mt-6 text-center text-[#c2b2a6] font-sans text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed max-w-2xl px-4">
        Available for live concert bookings, playback singing, film soundtrack compositions, corporate &amp; cultural festivals, and high-impact media production collaborations.
      </p>
<!-- Short Accent Divider -->
<div class="mt-6 w-10 h-[1.5px] bg-[#8a6839]/60 rounded-full"></div>
</header>
<!-- END: Top Decorative Clef Emblem -->
<!-- BEGIN: 4 Services Offering Cards Grid -->
<section aria-label="Services and Booking Categories" class="relative z-10 w-full mt-10 sm:mt-12" data-purpose="service-cards-grid">
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 w-full">
<!-- Card 01: Live Concerts & World Tours -->
<article class="group relative h-48 sm:h-52 rounded-2xl overflow-hidden border border-[rgba(180,128,58,0.35)] hover:border-[#dfa94b]/80 transition-all duration-300 shadow-lg hover:shadow-[0_8px_25px_rgba(223,169,75,0.18)]" data-purpose="service-card-1">
<!-- Background Image -->
<img alt="Live Concerts stage performance" class="absolute inset-0 w-full h-full object-cover object-center filter grayscale-[30%] group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG24d8y_c4k9sbfILCtrYwCdXRi9v5NHZFm67gzscsY1uIKhaUxPbgxMCrJJx_w9boVK4tTY8IXwxc3qPgJ3-lc8sE59ooNqX3_goLhi8B5VErWvfXKResgeRxhB146u5bmm53QmszvpmJIoQYtaQR7zOEILFBv4u2ao48uMWCqK9mk8hXfKsfPTST16LmRbsfO5rgiTUGHuIBVhpl3uTRi1vG2xpWx1Mwl3CpMACKHyCe-_ygAc8SXQ"/>
<!-- Dark Warm Scrim Overlay -->
<div class="absolute inset-0 card-scrim group-hover:opacity-90 transition-opacity"></div>
<!-- Card Content -->
<div class="relative h-full p-4 sm:p-5 flex flex-col justify-between z-10">
<!-- Header: Number & Micro-icon -->
<div>
<span class="block font-cormorant text-xl text-[#dfa94b]/90 font-medium">01</span>
<!-- Microphone Icon -->
<svg class="w-5 h-5 text-[#dfa94b] mt-1 stroke-current fill-none" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
<!-- Footer: Title & Interactive Arrow -->
<div class="flex items-end justify-between gap-2">
<h2 class="text-sm font-medium text-[#f5eee3] leading-snug tracking-wide group-hover:text-gold-300 transition-colors">
                Live Concerts &amp;<br/>World Tours
              </h2>
<div class="w-8 h-8 rounded-full border border-[rgba(215,168,75,0.4)] flex items-center justify-center bg-black/40 group-hover:bg-[#dfa94b] group-hover:border-[#dfa94b] transition-all flex-shrink-0">
<svg class="w-3.5 h-3.5 text-[#dfa94b] group-hover:text-black transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
</div>
</article>
<!-- Card 02: Film Playback & Studio Vocals -->
<article class="group relative h-48 sm:h-52 rounded-2xl overflow-hidden border border-[rgba(180,128,58,0.35)] hover:border-[#dfa94b]/80 transition-all duration-300 shadow-lg hover:shadow-[0_8px_25px_rgba(223,169,75,0.18)]" data-purpose="service-card-2">
<!-- Background Image -->
<img alt="Film playback and audio recording studio session" class="absolute inset-0 w-full h-full object-cover object-center filter grayscale-[30%] group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaVQj-KFvdN6Wy4toxlw8Cy3nbPCE-0Mo1XNH_XrVd1ISe4msPSDf2fiI-hrAqXdM7peAMCLbpUqBJox-xE50TNPk5sB8dDizL70Xh8Xjea7j4Gfkgmgkwlfbmh6CecbezX2Pu8s2t4_TqAnVAC-z4BwubbsiuFbiAbjv1d3nY5IG8RTmZf8zqMpftUgQSYh8IZGIeb6EAvFBIRYQ27uMjqrLshNA0P0M5plx_yR15gyTVsdZELnFEaA"/>
<!-- Dark Warm Scrim Overlay -->
<div class="absolute inset-0 card-scrim group-hover:opacity-90 transition-opacity"></div>
<!-- Card Content -->
<div class="relative h-full p-4 sm:p-5 flex flex-col justify-between z-10">
<div>
<span class="block font-cormorant text-xl text-[#dfa94b]/90 font-medium">02</span>
<!-- Clapperboard / Film Reel Icon -->
<svg class="w-5 h-5 text-[#dfa94b] mt-1 stroke-current fill-none" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
<div class="flex items-end justify-between gap-2">
<h2 class="text-sm font-medium text-[#f5eee3] leading-snug tracking-wide group-hover:text-gold-300 transition-colors">
                Film Playback &amp;<br/>Studio Vocals
              </h2>
<div class="w-8 h-8 rounded-full border border-[rgba(215,168,75,0.4)] flex items-center justify-center bg-black/40 group-hover:bg-[#dfa94b] group-hover:border-[#dfa94b] transition-all flex-shrink-0">
<svg class="w-3.5 h-3.5 text-[#dfa94b] group-hover:text-black transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
</div>
</article>
<!-- Card 03: Cultural & Corporate Galas -->
<article class="group relative h-48 sm:h-52 rounded-2xl overflow-hidden border border-[rgba(180,128,58,0.35)] hover:border-[#dfa94b]/80 transition-all duration-300 shadow-lg hover:shadow-[0_8px_25px_rgba(223,169,75,0.18)]" data-purpose="service-card-3">
<!-- Background Image -->
<img alt="Cultural dance and corporate auditorium gala" class="absolute inset-0 w-full h-full object-cover object-center filter grayscale-[30%] group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpTBC6foOeBoBc8IvdaSNh_hPyf-V9Ib5SLTZu86otfh4c7iT4eVhnow94eqtHS4cqqDikVYsk9uNl0gItMXFMko7_u5xDu1TJqOGjfoJMoN7WqLHTJeJnWRbMg6QYR8fijNgANwDjANk_KMv8zGDZtCHucW-g-nGp1JEA9FAfZkamEomP9gxmh-tVhOZcfFWTHhcIK8LiHdcYcG1Dgx6P8P6sCemLk92pAN2QHAAwcx5SkFYiGrzjeQ"/>
<!-- Dark Warm Scrim Overlay -->
<div class="absolute inset-0 card-scrim group-hover:opacity-90 transition-opacity"></div>
<!-- Card Content -->
<div class="relative h-full p-4 sm:p-5 flex flex-col justify-between z-10">
<div>
<span class="block font-cormorant text-xl text-[#dfa94b]/90 font-medium">03</span>
<!-- Classical Users / Stage Ensemble Icon -->
<svg class="w-5 h-5 text-[#dfa94b] mt-1 stroke-current fill-none" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke-linecap="round" stroke-linejoin="round"></path>
<circle cx="9" cy="7" r="4"></circle>
<path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
<div class="flex items-end justify-between gap-2">
<h2 class="text-sm font-medium text-[#f5eee3] leading-snug tracking-wide group-hover:text-gold-300 transition-colors">
                Cultural &amp; Corporate<br/>Galas
              </h2>
<div class="w-8 h-8 rounded-full border border-[rgba(215,168,75,0.4)] flex items-center justify-center bg-black/40 group-hover:bg-[#dfa94b] group-hover:border-[#dfa94b] transition-all flex-shrink-0">
<svg class="w-3.5 h-3.5 text-[#dfa94b] group-hover:text-black transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
</div>
</article>
<!-- Card 04: Executive Media Production -->
<article class="group relative h-48 sm:h-52 rounded-2xl overflow-hidden border border-[rgba(180,128,58,0.35)] hover:border-[#dfa94b]/80 transition-all duration-300 shadow-lg hover:shadow-[0_8px_25px_rgba(223,169,75,0.18)]" data-purpose="service-card-4">
<!-- Background Image -->
<img alt="Tejanjali executive music production with veena" class="absolute inset-0 w-full h-full object-cover object-[center_28%] filter grayscale-[30%] group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlA6SBpKyGjjfzfJ2pXAxhntJ01GWr21bN09S8Qcya4Qps7JvBx-jJGuNiqNEhoBRuBlBoxBvRXZatJhWXjYLGLxRStYzLLmdDlAJa69wFK0uxK434dF5DH4wYgm9uRTHfTIpqlaw3f3br9KNdNBVddX2S5-HwEUVrHiP3jKORGI2CSZrrtUNpx3Iqbh6l4ZDw_cvLamvERpLMWMtWGnHNzUhBY0LBfuHsV94npAfxieV7HTHw4qDarQ"/>
<!-- Dark Warm Scrim Overlay -->
<div class="absolute inset-0 card-scrim group-hover:opacity-90 transition-opacity"></div>
<!-- Card Content -->
<div class="relative h-full p-4 sm:p-5 flex flex-col justify-between z-10">
<div>
<span class="block font-cormorant text-xl text-[#dfa94b]/90 font-medium">04</span>
<!-- Video / Cinema Camera Icon -->
<svg class="w-5 h-5 text-[#dfa94b] mt-1 stroke-current fill-none" stroke-width="1.8" viewbox="0 0 24 24">
<path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
<div class="flex items-end justify-between gap-2">
<h2 class="text-sm font-medium text-[#f5eee3] leading-snug tracking-wide group-hover:text-gold-300 transition-colors">
                Executive Media<br/>Production
              </h2>
<div class="w-8 h-8 rounded-full border border-[rgba(215,168,75,0.4)] flex items-center justify-center bg-black/40 group-hover:bg-[#dfa94b] group-hover:border-[#dfa94b] transition-all flex-shrink-0">
<svg class="w-3.5 h-3.5 text-[#dfa94b] group-hover:text-black transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</div>
</div>
</article>
</div>
</section>
<!-- END: 4 Services Offering Cards Grid -->
<!-- BEGIN: Dual Action Call-To-Action Buttons -->
<section class="relative z-10 mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full" data-purpose="cta-button-group">
<!-- Primary CTA: BOOK FOR AN EVENT -->
<a class="group relative inline-flex items-center justify-between min-w-[240px] sm:min-w-[270px] px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d9a341] via-[#d5a83a] to-[#bf8c2c] text-[#140e0b] font-semibold text-xs tracking-[0.14em] shadow-gold-glow hover:brightness-105 transition-all duration-300 transform active:scale-95" href="#book-event" role="button">
<span class="font-sans font-bold">BOOK FOR AN EVENT</span>
<div class="w-7 h-7 rounded-full bg-[#17100e] text-[#d5a83a] flex items-center justify-center ml-4 group-hover:translate-x-0.5 transition-transform">
<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</a>
<!-- Secondary CTA: CONTACT MANAGEMENT -->
<a class="group relative inline-flex items-center justify-between min-w-[240px] sm:min-w-[270px] px-7 py-3.5 rounded-full border border-[rgba(195,142,65,0.45)] bg-[#120d0f]/60 hover:bg-[#1f1517] text-[#f2e9dc] font-medium text-xs tracking-[0.14em] transition-all duration-300 hover:border-[#dfa94b] active:scale-95" href="#contact" role="button">
<span class="font-sans font-medium text-[#e2d5c8] group-hover:text-white transition-colors">CONTACT MANAGEMENT</span>
<div class="w-7 h-7 rounded-full flex items-center justify-center ml-4 group-hover:translate-x-0.5 transition-transform text-[#dfa94b]">
<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewbox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</div>
</a>
</section>
<!-- END: Dual Action Call-To-Action Buttons -->
<!-- BEGIN: Bottom Footer Tagline -->
<footer class="relative z-10 mt-9 sm:mt-11 flex items-center justify-center gap-3 text-center" data-purpose="banner-footer-quote">
<span class="w-7 h-[1px] bg-[#6d5b54]/60"></span>
<p class="font-cormorant italic text-sm sm:text-[15px] tracking-wide text-[#9e8f87]">
        Music Connects People
      </p>
<span class="w-7 h-[1px] bg-[#6d5b54]/60"></span>
</footer>
<!-- END: Bottom Footer Tagline -->
</main>
</section>
<!-- END: ContactBookingSection -->
`;

const regex = /<!-- BEGIN: ContactBookingSection -->[\s\S]*?<!-- END: ContactBookingSection -->/;
if (regex.test(html)) {
  html = html.replace(regex, newSection.trim());
  console.log("Successfully replaced contact section.");
} else {
  console.log("Could not find contact section markers.");
}

fs.writeFileSync(htmlFile, html);
console.log("Done updating index.html");
