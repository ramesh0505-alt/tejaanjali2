const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const additionalRoutes = `
// --- Milestones API ---
app.get('/api/milestones', (req, res) => {
    db.all("SELECT m.*, ph.filename as photo_filename FROM milestones m LEFT JOIN photos ph ON m.photo_id = ph.id ORDER BY m.order_index ASC, m.id ASC", [], (err, rows) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
});
app.post('/api/admin/milestones', authenticateAdmin, (req, res) => {
    const { id, order_index, age_year, title, description, photo_id } = req.body;
    if (id) {
        db.run("UPDATE milestones SET order_index=?, age_year=?, title=?, description=?, photo_id=? WHERE id=?", 
            [order_index, age_year, title, description, photo_id, id], err => {
            if(err) return res.status(500).json({error: err.message});
            res.json({success: true});
        });
    } else {
        db.run("INSERT INTO milestones (order_index, age_year, title, description, photo_id) VALUES (?, ?, ?, ?, ?)", 
            [order_index || 0, age_year, title, description, photo_id], err => {
            if(err) return res.status(500).json({error: err.message});
            res.json({success: true});
        });
    }
});
app.delete('/api/admin/milestones/:id', authenticateAdmin, (req, res) => {
    db.run("DELETE FROM milestones WHERE id=?", req.params.id, err => {
        if(err) return res.status(500).json({error: err.message});
        res.json({success: true});
    });
});
`;

if (!code.includes('/api/milestones')) {
    code = code.replace('// Start Server', additionalRoutes + '\n// Start Server');
    fs.writeFileSync('server.js', code);
    console.log('Milestone routes added.');
} else {
    console.log('Milestone routes already exist.');
}
