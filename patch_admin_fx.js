const fs = require('fs');

let html = fs.readFileSync('public/admin/index.html', 'utf8');

const fxSection = `
            <!-- Visual Effects -->
            <div class="bg-espresso-800 rounded-lg border border-espresso-600 overflow-hidden">
                <div class="p-6 border-b border-espresso-600">
                    <h3 class="text-xs font-semibold tracking-wider uppercase text-ivory-muted mb-6">Visual Effects (Three.js)</h3>
                    
                    <div class="space-y-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="text-sm font-medium text-ivory-100">Three.js Effects</h4>
                                <p class="text-[10px] text-ivory-muted mt-1">Master switch for all WebGL 3D effects on the website.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer" x-model="formData.fx_enabled" x-bind:checked="formData.fx_enabled == '1'" @change="formData.fx_enabled = formData.fx_enabled == '1' ? '0' : '1'">
                                <div class="w-9 h-5 bg-espresso-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-ivory-muted after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-terracotta-500"></div>
                            </label>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="text-sm font-medium text-ivory-100">Hero Particle Effect</h4>
                                <p class="text-[10px] text-ivory-muted mt-1">Adds a subtle interactive flowing waveform to the homepage.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer" x-model="formData.fx_hero" x-bind:checked="formData.fx_hero == '1'" @change="formData.fx_hero = formData.fx_hero == '1' ? '0' : '1'">
                                <div class="w-9 h-5 bg-espresso-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-ivory-muted after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-terracotta-500"></div>
                            </label>
                        </div>

                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="text-sm font-medium text-ivory-100">Mouse Parallax</h4>
                                <p class="text-[10px] text-ivory-muted mt-1">Subtle camera movement reacting to visitor's cursor.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer" x-model="formData.fx_parallax" x-bind:checked="formData.fx_parallax == '1'" @change="formData.fx_parallax = formData.fx_parallax == '1' ? '0' : '1'">
                                <div class="w-9 h-5 bg-espresso-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-ivory-muted after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-terracotta-500"></div>
                            </label>
                        </div>

                        <div class="pt-4 border-t border-espresso-700/50">
                            <label class="block text-[10px] font-medium text-ivory-muted uppercase mb-2">Visual Effect Quality</label>
                            <select x-model="formData.fx_quality" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                                <option value="Auto">Auto (Recommended)</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
`;

if (!html.includes('Visual Effects (Three.js)')) {
    html = html.replace('<!-- Danger Zone -->', fxSection + '\n            <!-- Danger Zone -->');
    fs.writeFileSync('public/admin/index.html', html);
    console.log("Admin UI patched for Visual Effects.");
} else {
    console.log("Admin UI already patched.");
}
