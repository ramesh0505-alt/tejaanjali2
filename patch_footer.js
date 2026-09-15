const fs = require('fs');

// PATCH SERVER API
let serverCode = fs.readFileSync('server.js', 'utf8');
const socialRoutes = `
// --- Social Links API ---
app.get('/api/social-links', (req, res) => {
    db.all("SELECT * FROM social_links ORDER BY order_index ASC", [], (err, rows) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
});
app.post('/api/admin/social-links', authenticateAdmin, (req, res) => {
    const { id, platform, url, display_name, is_visible, order_index } = req.body;
    if (id) {
        db.run("UPDATE social_links SET platform=?, url=?, display_name=?, is_visible=?, order_index=? WHERE id=?", 
            [platform, url, display_name, is_visible, order_index, id], err => {
            if(err) return res.status(500).json({error: err.message});
            res.json({success: true});
        });
    } else {
        db.run("INSERT INTO social_links (platform, url, display_name, is_visible, order_index) VALUES (?, ?, ?, ?, ?)", 
            [platform, url, display_name, is_visible, order_index || 0], err => {
            if(err) return res.status(500).json({error: err.message});
            res.json({success: true});
        });
    }
});
app.delete('/api/admin/social-links/:id', authenticateAdmin, (req, res) => {
    db.run("DELETE FROM social_links WHERE id=?", req.params.id, err => {
        if(err) return res.status(500).json({error: err.message});
        res.json({success: true});
    });
});
`;
if(!serverCode.includes('/api/social-links')) {
    serverCode = serverCode.replace('// Start Server', socialRoutes + '\n// Start Server');
    fs.writeFileSync('server.js', serverCode);
}

// PATCH PUBLIC/INDEX.HTML
let html = fs.readFileSync('public/index.html', 'utf8');

const newFooter = `
<!-- BEGIN: MainFooter -->
<footer class="bg-[#100E0E] border-t border-[#3A302C] pt-16 pb-8" data-purpose="global-footer">
    <div class="max-w-7xl mx-auto px-6">
        <!-- Footer Main Content -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[#3A302C]/50">
            
            <!-- Brand Section -->
            <div class="space-y-4">
                <h2 class="font-cinzel text-3xl font-black tracking-widest text-[#F2E9DC]">TEJANJALI</h2>
                <h3 id="footer-roles" class="text-[10px] uppercase tracking-[0.2em] text-[#B75D45] font-semibold">
                    SINGER • LYRICIST • COMPOSER • PERFORMER
                </h3>
                <p id="footer-desc" class="text-sm text-[#B9AAA0] font-sans leading-relaxed max-w-xs pt-2">
                    Music, expression and performance in one artistic journey.
                </p>
                <div class="pt-2 opacity-50">
                    <span class="text-2xl text-[#B9AAA0]">𝄞</span>
                </div>
            </div>

            <!-- Explore Section -->
            <div id="footer-nav-section">
                <h4 class="text-xs uppercase tracking-widest text-[#F2E9DC] mb-6 font-semibold">Explore</h4>
                <ul class="space-y-3 text-sm text-[#B9AAA0] font-sans">
                    <li><a href="#hero" class="hover:text-[#B75D45] hover:underline decoration-1 underline-offset-4 transition-all duration-200">Home</a></li>
                    <li><a href="#about" class="hover:text-[#B75D45] hover:underline decoration-1 underline-offset-4 transition-all duration-200">About</a></li>
                    <li><a href="#journey" class="hover:text-[#B75D45] hover:underline decoration-1 underline-offset-4 transition-all duration-200">Journey</a></li>
                    <li><a href="#artistry" class="hover:text-[#B75D45] hover:underline decoration-1 underline-offset-4 transition-all duration-200">Artistry</a></li>
                    <li><a href="#music" class="hover:text-[#B75D45] hover:underline decoration-1 underline-offset-4 transition-all duration-200">Music</a></li>
                    <li><a href="#projects" class="hover:text-[#B75D45] hover:underline decoration-1 underline-offset-4 transition-all duration-200">Projects</a></li>
                    <li><a href="#gallery" class="hover:text-[#B75D45] hover:underline decoration-1 underline-offset-4 transition-all duration-200">Gallery</a></li>
                    <li><a href="#testimonials" class="hover:text-[#B75D45] hover:underline decoration-1 underline-offset-4 transition-all duration-200">Testimonials</a></li>
                    <li><a href="#contact" class="hover:text-[#B75D45] hover:underline decoration-1 underline-offset-4 transition-all duration-200">Contact</a></li>
                </ul>
            </div>

            <!-- Connect Section -->
            <div id="footer-social-section">
                <h4 class="text-xs uppercase tracking-widest text-[#F2E9DC] mb-6 font-semibold">Connect</h4>
                <div id="footer-social-links" class="flex gap-4 items-center">
                    <!-- Dynamic social links -->
                </div>
            </div>

            <!-- Contact/Booking Section -->
            <div id="footer-contact-section" class="space-y-4">
                <h4 class="text-xs uppercase tracking-widest text-[#F2E9DC] mb-6 font-semibold">Let's Create Something Musical</h4>
                <p class="text-sm text-[#B9AAA0] font-sans leading-relaxed">
                    For performances, collaborations, creative projects and professional enquiries.
                </p>
                <div class="pt-4">
                    <a href="#contact" id="footer-booking-btn" class="inline-block border border-[#3A302C] hover:border-[#B75D45] bg-[#100E0E] text-[#F2E9DC] hover:text-[#B75D45] hover:bg-[#B75D45]/10 px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300">
                        CONTACT TEJANJALI
                    </a>
                </div>
                <div class="pt-2">
                    <p id="footer-email" class="text-sm text-[#B9AAA0] font-sans"></p>
                </div>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
            <p id="footer-copyright" class="text-xs text-[#B9AAA0] font-sans tracking-wide">
                © 2026 TEJANJALI. All Rights Reserved.
            </p>
            <div class="flex gap-6 text-xs text-[#B9AAA0] font-sans">
                <a href="#" class="hover:text-[#F2E9DC] transition-colors">Privacy Policy</a>
                <a href="#" class="hover:text-[#F2E9DC] transition-colors">Terms</a>
            </div>
        </div>
    </div>
</footer>
<!-- END: MainFooter -->
`;

const footerRegex = /<!-- BEGIN: MainFooter -->[\s\S]*?<!-- END: MainFooter -->/;
html = html.replace(footerRegex, newFooter);
fs.writeFileSync('public/index.html', html);

console.log("Done");
