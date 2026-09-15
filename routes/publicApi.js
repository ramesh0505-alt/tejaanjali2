const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // 1. Get site settings
    router.get('/settings', (req, res) => {
        db.all("SELECT * FROM site_settings", (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            const settings = {};
            rows.forEach(r => settings[r.key] = r.value);
            res.json(settings);
        });
    });

    // 2. Get social links (Visible only)
    router.get('/social', (req, res) => {
        db.all("SELECT * FROM social_links WHERE visible = 1 ORDER BY display_order ASC", (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    });

    // 3. Get homepage content
    router.get('/homepage', (req, res) => {
        db.all("SELECT * FROM homepage WHERE visible = 1", (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    });

    // 4. Get journey milestones
    router.get('/journey', (req, res) => {
        db.all("SELECT * FROM journey_milestones WHERE visible = 1 ORDER BY year DESC", (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    });

    // 5. Get artistry roles
    router.get('/artistry', (req, res) => {
        db.all("SELECT * FROM artistry_roles WHERE visible = 1 ORDER BY display_order ASC", (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    });

    // 6. Get music/songs (Published and Visible)
    router.get('/songs', (req, res) => {
        db.all("SELECT * FROM songs WHERE visible = 1 AND status = 'PUBLISHED' ORDER BY display_order ASC", (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    });

    // 7. Get projects (Published and Visible)
    router.get('/projects', (req, res) => {
        db.all("SELECT * FROM projects WHERE visible = 1 AND status = 'PUBLISHED' ORDER BY display_order ASC", (err, projects) => {
            if (err) return res.status(500).json({ error: err.message });
            
            // Attach images to projects
            db.all("SELECT * FROM project_images ORDER BY display_order ASC", (err, images) => {
                if (!err) {
                    projects.forEach(p => {
                        p.images = images.filter(i => i.project_id === p.id);
                    });
                }
                res.json(projects);
            });
        });
    });

    // 8. Get gallery images
    router.get('/gallery', (req, res) => {
        db.all("SELECT * FROM gallery_images WHERE visible = 1 ORDER BY display_order ASC", (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    });

    // 9. Get testimonials
    router.get('/testimonials', (req, res) => {
        db.all("SELECT * FROM testimonials WHERE visible = 1 ORDER BY display_order ASC", (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    });

    // 10. Submit contact message (POST)
    router.post('/contact', (req, res) => {
        const { name, email, phone, subject, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: "Name, email, and message are required" });
        }
        const stmt = db.prepare(`INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)`);
        stmt.run([name, email, phone, subject, message], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, message: "Message sent successfully" });
        });
        stmt.finalize();
    });

    return router;
};
