const fs = require('fs');
let html = fs.readFileSync('public/admin/index.html', 'utf8');

const newSections = `
        <!-- ARTISTRY -->
        <section x-show="currentView === 'artistry'" x-cloak class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="font-serif text-2xl text-ivory-100">My Artistry</h2>
                    <p class="text-sm text-ivory-muted">Manage the roles, skills and creative disciplines displayed on your website.</p>
                </div>
                <button @click="addingRole = !addingRole" class="px-5 py-2 text-sm font-medium rounded bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors">+ Add Role</button>
            </div>
            
            <div x-show="addingRole" class="bg-espresso-800 rounded-lg border border-espresso-600 p-6 space-y-4 mb-8">
                <h3 class="font-serif text-xl text-ivory-100">Add New Role</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-medium text-ivory-muted mb-1.5">Role Name</label>
                        <input x-model="newRole.title" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-ivory-muted mb-1.5">Icon (emoji or symbol)</label>
                        <input x-model="newRole.icon" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-xs font-medium text-ivory-muted mb-1.5">Description</label>
                        <textarea x-model="newRole.description" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none" rows="2"></textarea>
                    </div>
                </div>
                <div class="flex justify-end gap-3 pt-4">
                    <button @click="addingRole = false" class="px-4 py-2 text-sm text-ivory-muted">Cancel</button>
                    <button @click="saveRole()" class="px-6 py-2 text-sm font-medium bg-terracotta-500 text-white rounded">Save Role</button>
                </div>
            </div>

            <div x-show="roles.length === 0" class="text-center py-20 text-ivory-muted text-sm border border-dashed border-espresso-600 rounded-lg">
                No creative roles added yet.<br><br>
                <button @click="addingRole = true" class="text-terracotta-400 font-medium">+ Add Role</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <template x-for="(role, index) in roles" :key="role.id">
                    <div class="bg-espresso-800 rounded-lg border border-espresso-600 p-5 flex flex-col justify-between">
                        <div class="flex gap-4">
                            <div class="w-10 h-10 rounded-full bg-espresso-900 flex items-center justify-center text-xl text-terracotta-400 flex-shrink-0" x-text="role.icon"></div>
                            <div>
                                <h4 class="font-semibold text-ivory-100 uppercase tracking-widest text-sm mb-1">
                                    <span class="text-ivory-muted mr-1" x-text="String(index + 1).padStart(2, '0')"></span>
                                    <span x-text="role.title"></span>
                                </h4>
                                <p class="text-sm text-ivory-muted" x-text="role.description"></p>
                            </div>
                        </div>
                        <div class="flex justify-between items-center mt-4 pt-4 border-t border-espresso-600">
                            <div class="flex items-center gap-2 text-[10px] uppercase font-bold" :class="role.is_visible ? 'text-emerald-400' : 'text-rose-400'">
                                <span class="w-1.5 h-1.5 rounded-full" :class="role.is_visible ? 'bg-emerald-400' : 'bg-rose-400'"></span>
                                <span x-text="role.is_visible ? 'Visible' : 'Hidden'"></span>
                            </div>
                            <div class="flex gap-3">
                                <button @click="toggleRoleVisibility(role)" class="text-xs text-brass hover:text-white" x-text="role.is_visible ? 'Hide' : 'Show'"></button>
                                <button @click="deleteRole(role.id)" class="text-xs text-rose-400 hover:text-rose-300">Delete</button>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </section>

        <!-- TESTIMONIALS -->
        <section x-show="currentView === 'testimonials'" x-cloak class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="font-serif text-2xl text-ivory-100">Testimonials</h2>
                    <p class="text-sm text-ivory-muted">Manage the words and recommendations displayed on your website.</p>
                </div>
                <button @click="addingTestimonial = !addingTestimonial" class="px-5 py-2 text-sm font-medium rounded bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors">+ Add Testimonial</button>
            </div>
            
            <div x-show="addingTestimonial" class="bg-espresso-800 rounded-lg border border-espresso-600 p-6 space-y-4 mb-8">
                <h3 class="font-serif text-xl text-ivory-100">Add New Testimonial</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-medium text-ivory-muted mb-1.5">Person Name</label>
                        <input x-model="newTestimonial.person_name" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-ivory-muted mb-1.5">Role / Description</label>
                        <input x-model="newTestimonial.role" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-xs font-medium text-ivory-muted mb-1.5">Quote</label>
                        <textarea x-model="newTestimonial.quote" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none" rows="3"></textarea>
                    </div>
                </div>
                <div class="flex justify-end gap-3 pt-4">
                    <button @click="addingTestimonial = false" class="px-4 py-2 text-sm text-ivory-muted">Cancel</button>
                    <button @click="saveTestimonial()" class="px-6 py-2 text-sm font-medium bg-terracotta-500 text-white rounded">Save Testimonial</button>
                </div>
            </div>

            <div x-show="testimonials.length === 0" class="text-center py-20 text-ivory-muted text-sm border border-dashed border-espresso-600 rounded-lg">
                No testimonials added yet.
            </div>

            <div class="grid grid-cols-1 gap-4">
                <template x-for="t in testimonials" :key="t.id">
                    <div class="bg-espresso-800 rounded-lg border border-espresso-600 p-6 flex flex-col md:flex-row gap-6">
                        <div class="w-16 h-16 rounded-full bg-espresso-900 flex-shrink-0 overflow-hidden">
                            <template x-if="t.photo_filename">
                                <img :src="getImageUrl(t.photo_filename)" class="w-full h-full object-cover">
                            </template>
                        </div>
                        <div class="flex-1">
                            <p class="text-lg font-serif text-ivory-100 italic mb-4">"<span x-text="t.quote"></span>"</p>
                            <h4 class="font-semibold text-ivory-100 text-sm" x-text="t.person_name"></h4>
                            <p class="text-xs text-brass uppercase tracking-wider" x-text="t.role"></p>
                        </div>
                        <div class="flex flex-col justify-between items-end gap-4 border-l border-espresso-600 pl-6">
                            <div class="flex flex-col items-end gap-2 text-[10px] uppercase font-bold">
                                <div class="flex items-center gap-1.5" :class="t.is_published ? 'text-emerald-400' : 'text-rose-400'">
                                    <span class="w-1.5 h-1.5 rounded-full" :class="t.is_published ? 'bg-emerald-400' : 'bg-rose-400'"></span>
                                    <span x-text="t.is_published ? 'Published' : 'Hidden'"></span>
                                </div>
                                <div x-show="t.is_featured" class="flex items-center gap-1.5 text-brass">
                                    ★ Featured
                                </div>
                            </div>
                            <div class="flex gap-3">
                                <button @click="toggleTestimonial(t)" class="text-xs text-brass hover:text-white" x-text="t.is_published ? 'Hide' : 'Show'"></button>
                                <button @click="deleteTestimonial(t.id)" class="text-xs text-rose-400 hover:text-rose-300">Delete</button>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </section>

        <!-- SETTINGS -->
        <section x-show="currentView === 'settings'" x-cloak class="space-y-8">
            <div>
                <h2 class="font-serif text-2xl text-ivory-100">Settings</h2>
                <p class="text-sm text-ivory-muted">Manage your profile, contact information and website preferences.</p>
            </div>

            <!-- Artist Profile -->
            <div class="bg-espresso-800 rounded-lg border border-espresso-600 overflow-hidden">
                <div class="p-6 border-b border-espresso-600">
                    <h3 class="text-xs font-semibold tracking-wider uppercase text-ivory-muted mb-6">Artist Profile</h3>
                    <div class="flex flex-col md:flex-row gap-8">
                        <div class="w-32 h-32 rounded-full bg-espresso-900 border border-espresso-600 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            <img x-show="getImageUrl(formData.hero_image)" :src="getImageUrl(formData.hero_image)" class="w-full h-full object-cover">
                        </div>
                        <div class="space-y-4 flex-1">
                            <div>
                                <label class="block text-[10px] font-medium text-ivory-muted uppercase mb-1">Name</label>
                                <input x-model="formData.hero_name" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                            </div>
                            <div>
                                <label class="block text-[10px] font-medium text-ivory-muted uppercase mb-1">Professional Title</label>
                                <input x-model="formData.hero_roles" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact Information -->
            <div class="bg-espresso-800 rounded-lg border border-espresso-600 overflow-hidden">
                <div class="p-6 border-b border-espresso-600">
                    <h3 class="text-xs font-semibold tracking-wider uppercase text-ivory-muted mb-6">Contact Information</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-[10px] font-medium text-ivory-muted uppercase mb-1">Email</label>
                            <input x-model="formData.contact_email" placeholder="Not added yet" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-[10px] font-medium text-ivory-muted uppercase mb-1">Phone</label>
                            <input x-model="formData.contact_phone" placeholder="Not added yet" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-[10px] font-medium text-ivory-muted uppercase mb-1">Location</label>
                            <input x-model="formData.contact_location" placeholder="Not added yet" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Social Media -->
            <div class="bg-espresso-800 rounded-lg border border-espresso-600 overflow-hidden">
                <div class="p-6 border-b border-espresso-600">
                    <h3 class="text-xs font-semibold tracking-wider uppercase text-ivory-muted mb-6">Social Media</h3>
                    <div class="space-y-4">
                        <div class="flex items-center gap-4">
                            <div class="w-8 text-ivory-muted">IG</div>
                            <input x-model="formData.social_instagram" placeholder="Not added yet" class="flex-1 bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="w-8 text-ivory-muted">YT</div>
                            <input x-model="formData.social_youtube" placeholder="Not added yet" class="flex-1 bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="w-8 text-ivory-muted">FB</div>
                            <input x-model="formData.social_facebook" placeholder="Not added yet" class="flex-1 bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Website Information -->
            <div class="bg-espresso-800 rounded-lg border border-espresso-600 overflow-hidden">
                <div class="p-6 border-b border-espresso-600">
                    <h3 class="text-xs font-semibold tracking-wider uppercase text-ivory-muted mb-6">Website Information</h3>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-[10px] font-medium text-ivory-muted uppercase mb-1">Website Title</label>
                            <input x-model="formData.website_title" placeholder="TEJANJALI" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-[10px] font-medium text-ivory-muted uppercase mb-1">Website Description</label>
                            <input x-model="formData.website_description" placeholder="Not added yet" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-[10px] font-medium text-ivory-muted uppercase mb-1">Footer Text</label>
                            <input x-model="formData.footer_text" placeholder="Not added yet" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                        </div>
                    </div>
                </div>
                <div class="px-6 py-4 bg-espresso-850 flex items-center justify-end">
                    <button @click="saveHero()" class="px-6 py-2 text-sm font-medium bg-terracotta-500 text-white rounded hover:bg-terracotta-600 transition-colors">Save All Settings</button>
                </div>
            </div>

            <!-- Danger Zone -->
            <div class="bg-espresso-900 rounded-lg border border-rose-900/50 overflow-hidden mt-12">
                <div class="p-6">
                    <h3 class="text-xs font-semibold tracking-wider uppercase text-rose-500 mb-6">Danger Zone</h3>
                    <div class="flex gap-4">
                        <button @click="logout()" class="px-4 py-2 text-sm border border-espresso-600 rounded text-ivory-muted hover:text-ivory-100 transition-colors">Logout</button>
                        <button class="px-4 py-2 text-sm border border-rose-900/50 rounded text-rose-500 hover:bg-rose-900/20 transition-colors">Delete Account</button>
                    </div>
                </div>
            </div>
        </section>
`;

if (html.includes('<!-- ARTISTRY -->')) {
    console.log("Already updated!");
} else {
    html = html.replace('<!-- MESSAGES -->', newSections + '\n        <!-- MESSAGES -->');

    const newJs = `
            roles: [],
            newRole: { title: '', description: '', icon: '', is_visible: 1 },
            addingRole: false,
            
            testimonials: [],
            newTestimonial: { person_name: '', role: '', quote: '', photo_id: null, is_featured: 0, is_published: 1 },
            addingTestimonial: false,

            init() {
                this.fetchContent();
                this.fetchPhotos();
                this.fetchProjects();
                this.fetchSongs();
                this.fetchInquiries();
                this.fetchRoles();
                this.fetchTestimonials();
            },
            
            async fetchRoles() {
                const res = await fetch('/api/roles');
                this.roles = await res.json();
            },
            async saveRole() {
                await fetch('/api/admin/roles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') },
                    body: JSON.stringify(this.newRole)
                });
                this.newRole = { title: '', description: '', icon: '', is_visible: 1 };
                this.addingRole = false;
                this.fetchRoles();
                this.showNotification('Role saved');
            },
            async deleteRole(id) {
                if(!confirm('Delete this role?')) return;
                await fetch('/api/admin/roles/' + id, {
                    method: 'DELETE',
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') }
                });
                this.fetchRoles();
            },
            async toggleRoleVisibility(role) {
                const updated = { ...role, is_visible: role.is_visible ? 0 : 1 };
                await fetch('/api/admin/roles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') },
                    body: JSON.stringify(updated)
                });
                this.fetchRoles();
            },

            async fetchTestimonials() {
                const res = await fetch('/api/testimonials');
                this.testimonials = await res.json();
            },
            async saveTestimonial() {
                await fetch('/api/admin/testimonials', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') },
                    body: JSON.stringify(this.newTestimonial)
                });
                this.newTestimonial = { person_name: '', role: '', quote: '', photo_id: null, is_featured: 0, is_published: 1 };
                this.addingTestimonial = false;
                this.fetchTestimonials();
                this.showNotification('Testimonial saved');
            },
            async deleteTestimonial(id) {
                if(!confirm('Delete this testimonial?')) return;
                await fetch('/api/admin/testimonials/' + id, {
                    method: 'DELETE',
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') }
                });
                this.fetchTestimonials();
            },
            async toggleTestimonial(t) {
                const updated = { ...t, is_published: t.is_published ? 0 : 1 };
                await fetch('/api/admin/testimonials', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') },
                    body: JSON.stringify(updated)
                });
                this.fetchTestimonials();
            },
`;

    html = html.replace('inquiries: [],', 'inquiries: [],' + newJs);
    
    // Remove the old init() block since we added a new one in newJs
    const initBlockRegex = /init\(\) \{[\s\S]*?\},/;
    html = html.replace(initBlockRegex, '');

    fs.writeFileSync('public/admin/index.html', html);
    console.log('HTML updated successfully!');
}
