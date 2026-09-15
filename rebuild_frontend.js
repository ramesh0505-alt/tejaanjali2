const fs = require('fs');
const path = require('path');

const htmlFile = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(htmlFile, 'utf8');

// ==========================================
// 1. CONTACT SECTION HTML
// ==========================================
const contactHtml = `
<!-- BEGIN: ContactBookingSection -->
<section class="py-16 bg-[#09080d] px-4 md:px-8" data-purpose="booking-cta" id="contact">
    <div class="max-w-[1400px] mx-auto rounded-[40px] border border-[#B75D45]/30 relative overflow-hidden bg-[#0d0a0b] shadow-2xl">
        <!-- Background Image with Gradient Overlay (Microphone vibe) -->
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-y-0 left-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1600&q=80')] bg-cover bg-right opacity-40 mix-blend-luminosity"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-[#09080d]/95 via-[#09080d]/80 to-[#09080d]"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#09080d] via-transparent to-[#09080d]/80"></div>
        </div>
        
        <div class="py-24 px-6 relative z-10 flex flex-col items-center text-center">
            <!-- Top Icon -->
            <div class="w-14 h-14 rounded-full border border-[#D6A066] flex items-center justify-center mb-6 bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(214,160,102,0.3)]">
                <span class="text-2xl text-[#D6A066]">𝄞</span>
            </div>
            
            <span class="text-[10px] font-bold tracking-[0.3em] text-[#D6A066] uppercase block mb-4 font-sans">
                Collaboration • Live Bookings
            </span>
            
            <h2 class="font-cinzel text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#F2E9DC] to-[#B75D45] tracking-tight leading-tight mb-6 drop-shadow-lg">
                LET'S CREATE<br>SOMETHING MUSICAL
            </h2>
            
            <p class="text-sm md:text-base text-[#B9AAA0] max-w-3xl mx-auto font-sans leading-relaxed mb-16">
                Available for live concert bookings, playback singing, film soundtrack compositions, corporate & cultural festivals, and high-impact media production collaborations.
            </p>
            
            <!-- 4 Column Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mb-16">
                <!-- Card 1 -->
                <div class="relative group rounded-2xl overflow-hidden border border-[#D6A066]/20 bg-black/40 backdrop-blur-md p-6 text-left hover:border-[#D6A066]/60 transition-all duration-300">
                    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540039155733-d7696d487346?w=400&q=80')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    <div class="relative z-10 flex flex-col h-full justify-between gap-12">
                        <div>
                            <span class="text-[#D6A066] text-xl font-cinzel block mb-2 opacity-80">01</span>
                            <svg class="w-6 h-6 text-[#D6A066] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                        </div>
                        <div class="flex items-end justify-between">
                            <p class="text-sm font-semibold text-[#F2E9DC] font-sans leading-tight">Live Concerts &<br>World Tours</p>
                            <div class="w-8 h-8 rounded-full border border-[#D6A066]/40 flex items-center justify-center text-[#D6A066] group-hover:bg-[#D6A066] group-hover:text-black transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Card 2 -->
                <div class="relative group rounded-2xl overflow-hidden border border-[#D6A066]/20 bg-black/40 backdrop-blur-md p-6 text-left hover:border-[#D6A066]/60 transition-all duration-300">
                    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    <div class="relative z-10 flex flex-col h-full justify-between gap-12">
                        <div>
                            <span class="text-[#D6A066] text-xl font-cinzel block mb-2 opacity-80">02</span>
                            <svg class="w-6 h-6 text-[#D6A066] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path></svg>
                        </div>
                        <div class="flex items-end justify-between">
                            <p class="text-sm font-semibold text-[#F2E9DC] font-sans leading-tight">Film Playback &<br>Studio Vocals</p>
                            <div class="w-8 h-8 rounded-full border border-[#D6A066]/40 flex items-center justify-center text-[#D6A066] group-hover:bg-[#D6A066] group-hover:text-black transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Card 3 -->
                <div class="relative group rounded-2xl overflow-hidden border border-[#D6A066]/20 bg-black/40 backdrop-blur-md p-6 text-left hover:border-[#D6A066]/60 transition-all duration-300">
                    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507676184212-d0330a156708?w=400&q=80')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    <div class="relative z-10 flex flex-col h-full justify-between gap-12">
                        <div>
                            <span class="text-[#D6A066] text-xl font-cinzel block mb-2 opacity-80">03</span>
                            <svg class="w-6 h-6 text-[#D6A066] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <div class="flex items-end justify-between">
                            <p class="text-sm font-semibold text-[#F2E9DC] font-sans leading-tight">Cultural &<br>Corporate Galas</p>
                            <div class="w-8 h-8 rounded-full border border-[#D6A066]/40 flex items-center justify-center text-[#D6A066] group-hover:bg-[#D6A066] group-hover:text-black transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Card 4 -->
                <div class="relative group rounded-2xl overflow-hidden border border-[#D6A066]/20 bg-black/40 backdrop-blur-md p-6 text-left hover:border-[#D6A066]/60 transition-all duration-300">
                    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=400&q=80')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    <div class="relative z-10 flex flex-col h-full justify-between gap-12">
                        <div>
                            <span class="text-[#D6A066] text-xl font-cinzel block mb-2 opacity-80">04</span>
                            <svg class="w-6 h-6 text-[#D6A066] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        </div>
                        <div class="flex items-end justify-between">
                            <p class="text-sm font-semibold text-[#F2E9DC] font-sans leading-tight">Executive Media<br>Production</p>
                            <div class="w-8 h-8 rounded-full border border-[#D6A066]/40 flex items-center justify-center text-[#D6A066] group-hover:bg-[#D6A066] group-hover:text-black transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 w-full sm:w-auto">
                <a href="mailto:contact@tejanjaliofficial.com" class="group flex items-center justify-between gap-4 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D6A066] to-[#A36D48] text-black font-sans font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(214,160,102,0.3)] w-full sm:w-auto">
                    <span>Book For An Event</span>
                    <div class="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                </a>
                <a href="#about" class="group flex items-center justify-between gap-4 px-6 py-3.5 rounded-full border border-[#D6A066]/40 text-[#F2E9DC] font-sans font-semibold text-xs uppercase tracking-widest hover:border-[#D6A066] hover:bg-[#D6A066]/10 transition-all w-full sm:w-auto">
                    <span>Contact Management</span>
                    <div class="w-6 h-6 rounded-full border border-[#D6A066]/40 flex items-center justify-center group-hover:border-[#D6A066] transition-colors">
                        <svg class="w-3 h-3 text-[#D6A066]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                </a>
            </div>
            
            <!-- Footer decorative text -->
            <div class="flex items-center justify-center gap-4 text-[#B9AAA0]/50 text-sm font-cinzel italic">
                <span>&mdash;</span>
                <span>Music Connects People</span>
                <span>&mdash;</span>
            </div>
        </div>
    </div>
</section>
<!-- END: ContactBookingSection -->
`;

// ==========================================
// 2. FOOTER SECTION HTML
// ==========================================
const footerHtml = `
<!-- BEGIN: MainFooter -->
<footer class="bg-[#0b0908] border-t border-[#3A302C]/30 relative overflow-hidden" data-purpose="global-footer">
    
    <!-- Right side singer image overlay (matching the new design) -->
    <div class="absolute right-0 top-0 w-full md:w-1/2 lg:w-1/3 h-full pointer-events-none opacity-40 mix-blend-luminosity">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516280440502-6c738528994a?w=800&q=80')] bg-cover bg-left"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#0b0908] via-[#0b0908]/80 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0b0908] to-transparent opacity-80"></div>
    </div>
    
    <!-- Flowing wave overlay on the left -->
    <div class="absolute left-0 bottom-0 w-full md:w-1/2 h-[300px] pointer-events-none opacity-20">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80')] bg-cover bg-center"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0b0908] to-[#0b0908]"></div>
    </div>

    <div class="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20 border-b border-[#3A302C]/30">
            
            <!-- Column 1: Brand -->
            <div class="space-y-6">
                <h2 class="font-cinzel text-4xl font-normal tracking-[0.15em] text-[#F2E9DC]">TEJANJALI</h2>
                <h3 class="text-[10px] uppercase tracking-[0.2em] text-[#B75D45] font-semibold">
                    SINGER • LYRICIST • COMPOSER • PERFORMER
                </h3>
                <p class="text-sm text-[#B9AAA0] font-sans leading-relaxed pt-2 max-w-[240px]">
                    Music, expression and performance in one artistic journey.
                </p>
                <div class="pt-6 flex items-center gap-4">
                    <span class="text-3xl text-[#F2E9DC]">𝄞</span>
                    <span class="text-[#B9AAA0]/60 italic font-cinzel text-sm">— Music Connects People</span>
                </div>
            </div>
            
            <!-- Column 2: Explore -->
            <div class="lg:pl-8">
                <h4 class="text-xs font-bold uppercase tracking-widest text-[#F2E9DC] mb-8">EXPLORE</h4>
                <ul class="space-y-4">
                    <li><a href="#" class="text-sm text-[#F2E9DC] hover:text-[#D6A066] transition-colors">Home</a></li>
                    <li><a href="#about" class="text-sm text-[#F2E9DC] hover:text-[#D6A066] transition-colors">About</a></li>
                    <li><a href="#journey" class="text-sm text-[#F2E9DC] hover:text-[#D6A066] transition-colors">Journey</a></li>
                    <li><a href="#artistry" class="text-sm text-[#F2E9DC] hover:text-[#D6A066] transition-colors">Artistry</a></li>
                    <li><a href="#music" class="text-sm text-[#F2E9DC] hover:text-[#D6A066] transition-colors">Music</a></li>
                    <li><a href="#projects" class="text-sm text-[#F2E9DC] hover:text-[#D6A066] transition-colors">Projects</a></li>
                    <li><a href="#gallery" class="text-sm text-[#F2E9DC] hover:text-[#D6A066] transition-colors">Gallery</a></li>
                    <li><a href="#testimonials" class="text-sm text-[#F2E9DC] hover:text-[#D6A066] transition-colors">Testimonials</a></li>
                    <li><a href="#contact" class="text-sm text-[#F2E9DC] hover:text-[#D6A066] transition-colors">Contact</a></li>
                </ul>
            </div>
            
            <!-- Column 3: Connect -->
            <div>
                <h4 class="text-xs font-bold uppercase tracking-widest text-[#F2E9DC] mb-8">CONNECT</h4>
                <p class="text-sm text-[#B9AAA0] font-sans leading-relaxed mb-6 max-w-[240px]">
                    Follow Tejanjali's musical journey across platforms.
                </p>
                
                <div class="flex flex-wrap gap-4 items-center mb-10">
                    <!-- Social Circle Icons -->
                    <a href="#" class="w-10 h-10 rounded-full border border-[#3A302C] hover:border-[#D6A066] flex items-center justify-center text-[#B9AAA0] hover:text-[#D6A066] transition-all">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full border border-[#3A302C] hover:border-[#D6A066] flex items-center justify-center text-[#B9AAA0] hover:text-[#D6A066] transition-all">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full border border-[#3A302C] hover:border-[#D6A066] flex items-center justify-center text-[#B9AAA0] hover:text-[#D6A066] transition-all">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.781-.18-.6.18-1.2.78-1.381 4.32-1.32 11.52-1.02 15.72 1.5.599.36 1.02 1.02.6 1.62-.3.6-1.02.72-1.62.42z"/></svg>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full border border-[#3A302C] hover:border-[#D6A066] flex items-center justify-center text-[#B9AAA0] hover:text-[#D6A066] transition-all">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </a>
                </div>
                
                <div class="border-t border-[#3A302C]/50 pt-6">
                    <p class="text-sm text-[#F2E9DC] font-sans italic leading-relaxed max-w-[250px]">
                        "Music gives a soul to the universe, wings to the mind and life to everything."
                    </p>
                    <p class="text-[10px] uppercase tracking-[0.2em] text-[#B9AAA0]/60 mt-2">— PLATO</p>
                </div>
            </div>
            
            <!-- Column 4: Let's Create -->
            <div>
                <h4 class="text-xs font-bold uppercase tracking-widest text-[#F2E9DC] mb-6">LET'S CREATE SOMETHING MUSICAL</h4>
                <p class="text-sm text-[#F2E9DC] font-sans leading-relaxed mb-8 max-w-[240px]">
                    For performances, collaborations, creative projects and professional enquiries.
                </p>
                
                <a href="#contact" class="inline-flex items-center gap-3 bg-[#a86551] hover:bg-[#B75D45] text-white px-8 py-3 rounded text-xs font-semibold uppercase tracking-widest transition-colors shadow-lg">
                    Contact Tejanjali
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </a>
                
                <!-- Hand-written overlay accent -->
                <div class="absolute bottom-24 right-12 opacity-80 pointer-events-none transform rotate-[-10deg]">
                    <span class="font-cinzel text-5xl italic text-[#D6A066]">Live.<br>Create.<br>Inspire.</span>
                </div>
            </div>
            
        </div>
        
        <!-- Bottom Bar -->
        <div class="flex flex-col md:flex-row justify-between items-center py-8 gap-4">
            <p class="text-xs text-[#B9AAA0] font-sans">
                © 2026 TEJANJALI. All Rights Reserved.
            </p>
            <div class="flex items-center gap-8">
                <div class="flex gap-6 text-xs text-[#B9AAA0] font-sans">
                    <a href="#" class="hover:text-[#F2E9DC] transition-colors">Privacy Policy</a>
                    <a href="#" class="hover:text-[#F2E9DC] transition-colors">Terms</a>
                </div>
                <div class="hidden md:block w-16 h-px bg-[#3A302C]"></div>
                <span class="text-xs text-[#B9AAA0]/60 italic font-cinzel">Made for Music.</span>
            </div>
        </div>
    </div>
</footer>
<!-- END: MainFooter -->
`;

// ==========================================
// 3. EXECUTE REPLACEMENT
// ==========================================
const replaceSection = (startMarker, endMarker, newContent) => {
    // We parse with simple regex string construction without syntax errors
    const escapedStart = startMarker;
    const escapedEnd = endMarker;
    const regex = new RegExp("<!-- " + escapedStart + " -->[\\s\\S]*?<!-- " + escapedEnd + " -->");
    
    if (regex.test(html)) {
        html = html.replace(regex, newContent.trim());
        console.log("Successfully rebuilt " + startMarker);
    } else {
        console.log("Could not find " + startMarker + " in index.html");
    }
};

replaceSection('BEGIN: ContactBookingSection', 'END: ContactBookingSection', contactHtml);
replaceSection('BEGIN: MainFooter', 'END: MainFooter', footerHtml);

fs.writeFileSync(htmlFile, html);
console.log("Frontend successfully polished and converted back to pure HTML/Tailwind components!");
