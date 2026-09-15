const fs = require('fs');
let html = fs.readFileSync('public/admin/index.html', 'utf8');

const journeySection = `
        <!-- JOURNEY -->
        <section x-show="currentView === 'journey'" x-cloak class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="font-serif text-2xl text-ivory-100">The Musical Journey</h2>
                    <p class="text-sm text-ivory-muted">Manage the timeline of your professional career.</p>
                </div>
                <button @click="addingMilestone = !addingMilestone" class="px-5 py-2 text-sm font-medium rounded bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors">+ Add Milestone</button>
            </div>
            
            <div x-show="addingMilestone" class="bg-espresso-800 rounded-lg border border-espresso-600 p-6 space-y-4 mb-8">
                <h3 class="font-serif text-xl text-ivory-100">Add New Milestone</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-medium text-ivory-muted mb-1.5">Age / Year</label>
                        <input x-model="newMilestone.age_year" placeholder="e.g. AGE 8 or 2015" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-ivory-muted mb-1.5">Title</label>
                        <input x-model="newMilestone.title" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none">
                    </div>
                    <div class="md:col-span-2">
                        <label class="block text-xs font-medium text-ivory-muted mb-1.5">Description</label>
                        <textarea x-model="newMilestone.description" class="w-full bg-espresso-900 border border-espresso-600 rounded px-3 py-2 text-sm text-ivory-100 focus:outline-none" rows="2"></textarea>
                    </div>
                </div>
                <div class="flex justify-end gap-3 pt-4">
                    <button @click="addingMilestone = false" class="px-4 py-2 text-sm text-ivory-muted">Cancel</button>
                    <button @click="saveMilestone()" class="px-6 py-2 text-sm font-medium bg-terracotta-500 text-white rounded">Save Milestone</button>
                </div>
            </div>

            <div x-show="milestones.length === 0" class="text-center py-20 text-ivory-muted text-sm border border-dashed border-espresso-600 rounded-lg">
                No milestones added yet.
            </div>

            <div class="relative border-l border-espresso-600 ml-4 space-y-8 pb-8">
                <template x-for="(m, index) in milestones" :key="m.id">
                    <div class="relative pl-8">
                        <div class="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-terracotta-500"></div>
                        <div class="bg-espresso-800 rounded-lg border border-espresso-600 p-5 flex flex-col md:flex-row gap-6">
                            <div class="flex-1">
                                <span class="text-xs font-bold text-terracotta-400 tracking-widest uppercase mb-1 block" x-text="m.age_year"></span>
                                <h4 class="font-serif text-xl text-ivory-100 mb-2" x-text="m.title"></h4>
                                <p class="text-sm text-ivory-muted" x-text="m.description"></p>
                            </div>
                            <template x-if="m.photo_filename">
                                <div class="w-full md:w-48 h-32 rounded bg-espresso-900 flex-shrink-0 overflow-hidden">
                                    <img :src="getImageUrl(m.photo_filename)" class="w-full h-full object-cover">
                                </div>
                            </template>
                        </div>
                        <div class="flex justify-end gap-3 mt-2">
                            <button @click="moveMilestone(index, -1)" x-show="index > 0" class="text-xs text-brass hover:text-white">Move Up</button>
                            <button @click="moveMilestone(index, 1)" x-show="index < milestones.length - 1" class="text-xs text-brass hover:text-white">Move Down</button>
                            <button @click="deleteMilestone(m.id)" class="text-xs text-rose-400 hover:text-rose-300 ml-4">Delete</button>
                        </div>
                    </div>
                </template>
            </div>
        </section>
`;

if (!html.includes('<!-- JOURNEY -->')) {
    html = html.replace('<!-- ARTISTRY -->', journeySection + '\n        <!-- ARTISTRY -->');
    
    const journeyJs = `
            milestones: [],
            newMilestone: { age_year: '', title: '', description: '', photo_id: null },
            addingMilestone: false,
    `;
    
    html = html.replace('roles: [],', journeyJs + '\n            roles: [],');
    
    const journeyMethods = `
            async fetchMilestones() {
                const res = await fetch('/api/milestones');
                this.milestones = await res.json();
            },
            async saveMilestone() {
                this.newMilestone.order_index = this.milestones.length + 1;
                await fetch('/api/admin/milestones', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') },
                    body: JSON.stringify(this.newMilestone)
                });
                this.newMilestone = { age_year: '', title: '', description: '', photo_id: null };
                this.addingMilestone = false;
                this.fetchMilestones();
                this.showNotification('Milestone saved');
            },
            async deleteMilestone(id) {
                if(!confirm('Delete this milestone?')) return;
                await fetch('/api/admin/milestones/' + id, {
                    method: 'DELETE',
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') }
                });
                this.fetchMilestones();
            },
            async moveMilestone(index, direction) {
                const arr = this.milestones;
                if (index + direction < 0 || index + direction >= arr.length) return;
                
                const m1 = arr[index];
                const m2 = arr[index + direction];
                
                const tempOrder = m1.order_index;
                m1.order_index = m2.order_index;
                m2.order_index = tempOrder;
                
                await fetch('/api/admin/milestones', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') },
                    body: JSON.stringify(m1)
                });
                await fetch('/api/admin/milestones', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('adminToken') },
                    body: JSON.stringify(m2)
                });
                this.fetchMilestones();
            },
    `;
    
    html = html.replace('async fetchRoles()', journeyMethods + '\n            async fetchRoles()');
    html = html.replace('this.fetchRoles();', 'this.fetchMilestones();\n                this.fetchRoles();');
    
    fs.writeFileSync('public/admin/index.html', html);
    console.log('Journey section added!');
} else {
    console.log('Journey section already exists!');
}
