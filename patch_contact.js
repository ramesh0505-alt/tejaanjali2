const fs = require('fs');

const htmlFile = 'public/index.html';
let html = fs.readFileSync(htmlFile, 'utf8');

const newSection = `
<!-- BEGIN: ContactBookingSection -->
<section class="relative py-28 overflow-hidden bg-[#09080d]" data-purpose="booking-cta" id="contact">
    <!-- Background Image with Gradient Overlay -->
    <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1600&q=80')] bg-cover bg-center opacity-60 mix-blend-luminosity"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#09080d]/90 via-[#09080d]/80 to-[#09080d]"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#09080d] via-transparent to-[#09080d]/80"></div>
    </div>
    
    <div class="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <!-- Top Icon -->
        <div class="w-14 h-14 rounded-full border border-[#B75D45] flex items-center justify-center mb-6 bg-black/40 backdrop-blur-sm">
            <span class="text-2xl text-[#F2E9DC]">𝄞</span>
        </div>
        
        <span class="text-[10px] font-bold tracking-[0.3em] text-[#B75D45] uppercase block mb-4 font-sans">
            Collaboration • Live Bookings
        </span>
        
        <h2 class="font-cinzel text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#F2E9DC] to-[#B75D45] tracking-tight leading-tight mb-6">
            LET'S CREATE<br>SOMETHING MUSICAL
        </h2>
        
        <p class="text-sm md:text-base text-[#B9AAA0] max-w-3xl mx-auto font-sans leading-relaxed mb-16">
            Available for live concert bookings, playback singing, film soundtrack compositions, corporate & cultural festivals, and high-impact media production collaborations.
        </p>
        
        <!-- 4 Column Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-16">
            <!-- Card 1 -->
            <div class="relative group rounded-2xl overflow-hidden border border-[#B75D45]/30 bg-black/60 backdrop-blur-md p-6 text-left hover:border-[#B75D45] transition-colors duration-300">
                <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540039155733-d7696d487346?w=400&q=80')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                <div class="relative z-10 flex flex-col h-full justify-between gap-12">
                    <div>
                        <span class="text-[#B75D45] text-xl font-cinzel block mb-2">01</span>
                        <svg class="w-6 h-6 text-[#F2E9DC] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                    </div>
                    <div class="flex items-end justify-between">
                        <p class="text-sm font-semibold text-[#F2E9DC] font-sans leading-tight">Live Concerts &<br>World Tours</p>
                        <div class="w-8 h-8 rounded-full border border-[#B75D45]/50 flex items-center justify-center text-[#B75D45] group-hover:bg-[#B75D45] group-hover:text-black transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Card 2 -->
            <div class="relative group rounded-2xl overflow-hidden border border-[#B75D45]/30 bg-black/60 backdrop-blur-md p-6 text-left hover:border-[#B75D45] transition-colors duration-300">
                <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                <div class="relative z-10 flex flex-col h-full justify-between gap-12">
                    <div>
                        <span class="text-[#B75D45] text-xl font-cinzel block mb-2">02</span>
                        <svg class="w-6 h-6 text-[#F2E9DC] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path></svg>
                    </div>
                    <div class="flex items-end justify-between">
                        <p class="text-sm font-semibold text-[#F2E9DC] font-sans leading-tight">Film Playback &<br>Studio Vocals</p>
                        <div class="w-8 h-8 rounded-full border border-[#B75D45]/50 flex items-center justify-center text-[#B75D45] group-hover:bg-[#B75D45] group-hover:text-black transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Card 3 -->
            <div class="relative group rounded-2xl overflow-hidden border border-[#B75D45]/30 bg-black/60 backdrop-blur-md p-6 text-left hover:border-[#B75D45] transition-colors duration-300">
                <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507676184212-d0330a156708?w=400&q=80')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                <div class="relative z-10 flex flex-col h-full justify-between gap-12">
                    <div>
                        <span class="text-[#B75D45] text-xl font-cinzel block mb-2">03</span>
                        <svg class="w-6 h-6 text-[#F2E9DC] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <div class="flex items-end justify-between">
                        <p class="text-sm font-semibold text-[#F2E9DC] font-sans leading-tight">Cultural &<br>Corporate Galas</p>
                        <div class="w-8 h-8 rounded-full border border-[#B75D45]/50 flex items-center justify-center text-[#B75D45] group-hover:bg-[#B75D45] group-hover:text-black transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Card 4 -->
            <div class="relative group rounded-2xl overflow-hidden border border-[#B75D45]/30 bg-black/60 backdrop-blur-md p-6 text-left hover:border-[#B75D45] transition-colors duration-300">
                <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=400&q=80')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                <div class="relative z-10 flex flex-col h-full justify-between gap-12">
                    <div>
                        <span class="text-[#B75D45] text-xl font-cinzel block mb-2">04</span>
                        <svg class="w-6 h-6 text-[#F2E9DC] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    </div>
                    <div class="flex items-end justify-between">
                        <p class="text-sm font-semibold text-[#F2E9DC] font-sans leading-tight">Executive Media<br>Production</p>
                        <div class="w-8 h-8 rounded-full border border-[#B75D45]/50 flex items-center justify-center text-[#B75D45] group-hover:bg-[#B75D45] group-hover:text-black transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a href="mailto:contact@tejanjaliofficial.com" class="group flex items-center justify-between gap-4 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D6A066] to-[#B75D45] text-black font-sans font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all w-full sm:w-auto">
                <span>Book For An Event</span>
                <div class="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            </a>
            <a href="#about" class="group flex items-center justify-between gap-4 px-6 py-3.5 rounded-full border border-[#B75D45]/50 text-[#F2E9DC] font-sans font-semibold text-xs uppercase tracking-widest hover:border-[#B75D45] hover:bg-[#B75D45]/10 transition-all w-full sm:w-auto">
                <span>Contact Management</span>
                <div class="w-6 h-6 rounded-full border border-[#B75D45]/50 flex items-center justify-center group-hover:border-[#B75D45] transition-colors">
                    <svg class="w-3 h-3 text-[#B75D45]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
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
</section>
<!-- END: ContactBookingSection -->
`;

const regex = /<!-- BEGIN: ContactBookingSection -->[\s\S]*?<!-- END: ContactBookingSection -->/;
if (regex.test(html)) {
    html = html.replace(regex, newSection.trim());
    fs.writeFileSync(htmlFile, html);
    console.log("Section successfully replaced.");
} else {
    console.log("Could not find the section.");
}
