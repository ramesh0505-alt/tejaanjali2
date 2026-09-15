const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const additionalRoutes = `
// --- Roles API ---
app.get('/api/roles', (req, res) => {
    db.all("SELECT * FROM roles ORDER BY id ASC", [], (err, rows) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
});
app.post('/api/admin/roles', authenticateAdmin, (req, res) => {
    const { id, title, description, icon, is_visible } = req.body;
    if (id) {
        db.run("UPDATE roles SET title=?, description=?, icon=?, is_visible=? WHERE id=?", 
            [title, description, icon, is_visible, id], err => {
            if(err) return res.status(500).json({error: err.message});
            res.json({success: true});
        });
    } else {
        db.run("INSERT INTO roles (title, description, icon, is_visible) VALUES (?, ?, ?, ?)", 
            [title, description, icon, is_visible !== undefined ? is_visible : 1], err => {
            if(err) return res.status(500).json({error: err.message});
            res.json({success: true});
        });
    }
});
app.delete('/api/admin/roles/:id', authenticateAdmin, (req, res) => {
    db.run("DELETE FROM roles WHERE id=?", req.params.id, err => {
        if(err) return res.status(500).json({error: err.message});
        res.json({success: true});
    });
});

// --- Testimonials API ---
app.get('/api/testimonials', (req, res) => {
    db.all("SELECT t.*, ph.filename as photo_filename FROM testimonials t LEFT JOIN photos ph ON t.photo_id = ph.id ORDER BY t.id DESC", [], (err, rows) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
});
app.post('/api/admin/testimonials', authenticateAdmin, (req, res) => {
    const { id, person_name, role, quote, photo_id, is_featured, is_published } = req.body;
    if (id) {
        db.run("UPDATE testimonials SET person_name=?, role=?, quote=?, photo_id=?, is_featured=?, is_published=? WHERE id=?", 
            [person_name, role, quote, photo_id, is_featured, is_published, id], err => {
            if(err) return res.status(500).json({error: err.message});
            res.json({success: true});
        });
    } else {
        db.run("INSERT INTO testimonials (person_name, role, quote, photo_id, is_featured, is_published) VALUES (?, ?, ?, ?, ?, ?)", 
            [person_name, role, quote, photo_id, is_featured, is_published], err => {
            if(err) return res.status(500).json({error: err.message});
            res.json({success: true});
        });
    }
});
app.delete('/api/admin/testimonials/:id', authenticateAdmin, (req, res) => {
    db.run("DELETE FROM testimonials WHERE id=?", req.params.id, err => {
        if(err) return res.status(500).json({error: err.message});
        res.json({success: true});
    });
});
`;

if (!code.includes('/api/roles')) {
    code = code.replace('// Start Server', additionalRoutes + '\n// Start Server');
    fs.writeFileSync('server.js', code);
    console.log('Routes added.');
} else {
    console.log('Routes already exist.');
}
