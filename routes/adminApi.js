const express = require('express');
const router = express.Router();

module.exports = (db, upload) => {
    
    // File Upload Endpoint
    router.post('/upload', upload.single('file'), (req, res) => {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
        // Return the public path for the file
        res.json({ 
            success: true, 
            url: '/uploads/' + req.file.filename,
            filename: req.file.filename,
            size: req.file.size 
        });
    });

    // Dynamic CRUD function for simple tables
    const generateCrud = (tableName) => {
        // GET all
        router.get(`/${tableName}`, (req, res) => {
            db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(rows);
            });
        });

        // GET single
        router.get(`/${tableName}/:id`, (req, res) => {
            db.get(`SELECT * FROM ${tableName} WHERE id = ?`, [req.params.id], (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                if (!row) return res.status(404).json({ error: "Not found" });
                res.json(row);
            });
        });

        // POST (Create)
        router.post(`/${tableName}`, (req, res) => {
            const keys = Object.keys(req.body);
            const values = Object.values(req.body);
            const placeholders = keys.map(() => '?').join(',');
            const stmt = db.prepare(`INSERT INTO ${tableName} (${keys.join(',')}) VALUES (${placeholders})`);
            
            stmt.run(values, function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ id: this.lastID, ...req.body });
            });
            stmt.finalize();
        });

        // PUT (Update)
        router.put(`/${tableName}/:id`, (req, res) => {
            const keys = Object.keys(req.body);
            const values = Object.values(req.body);
            const setClause = keys.map(k => `${k} = ?`).join(',');
            const stmt = db.prepare(`UPDATE ${tableName} SET ${setClause} WHERE id = ?`);
            
            stmt.run([...values, req.params.id], function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ success: true, changes: this.changes });
            });
            stmt.finalize();
        });

        // DELETE
        router.delete(`/${tableName}/:id`, (req, res) => {
            const stmt = db.prepare(`DELETE FROM ${tableName} WHERE id = ?`);
            stmt.run([req.params.id], function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ success: true, deleted: this.changes });
            });
            stmt.finalize();
        });
    };

    // Apply basic CRUD to these tables
    const tables = [
        'social_links', 'homepage', 'journey_milestones', 
        'artistry_roles', 'songs', 'projects', 'gallery_images', 
        'testimonials', 'contact_messages'
    ];
    
    tables.forEach(table => generateCrud(table));

    // Dashboard Stats
    router.get('/dashboard/stats', (req, res) => {
        const stats = { songs: 0, projects: 0, photos: 0, unread_messages: 0, testimonials: 0 };
        let queriesCompleted = 0;
        const checkDone = () => {
            queriesCompleted++;
            if (queriesCompleted === 5) res.json(stats);
        };

        db.get("SELECT COUNT(*) as c FROM songs", (err, row) => { if (row) stats.songs = row.c; checkDone(); });
        db.get("SELECT COUNT(*) as c FROM projects", (err, row) => { if (row) stats.projects = row.c; checkDone(); });
        db.get("SELECT COUNT(*) as c FROM gallery_images", (err, row) => { if (row) stats.photos = row.c; checkDone(); });
        db.get("SELECT COUNT(*) as c FROM contact_messages WHERE status = 'UNREAD'", (err, row) => { if (row) stats.unread_messages = row.c; checkDone(); });
        db.get("SELECT COUNT(*) as c FROM testimonials", (err, row) => { if (row) stats.testimonials = row.c; checkDone(); });
    });

    // Site Settings (Key-Value overrides)
    router.post('/settings/bulk', (req, res) => {
        const settings = req.body; // object of { key: value }
        const stmt = db.prepare(`INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)`);
        
        db.serialize(() => {
            db.run("BEGIN TRANSACTION");
            for (const [key, value] of Object.entries(settings)) {
                stmt.run([key, String(value)]);
            }
            db.run("COMMIT", (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ success: true });
            });
        });
        stmt.finalize();
    });

    return router;
};
