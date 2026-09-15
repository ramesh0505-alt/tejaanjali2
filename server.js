const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
const JWT_SECRET = 'tejanjali_super_secret_key_2026'; // In production, use env var

// Database connection
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up Multer for file uploads
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// JWT Authentication Middleware
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });
        req.user = user;
        next();
    });
};

// ==========================================
// API ROUTES MOUNTING
// ==========================================

const publicApi = require('./routes/publicApi')(db);
app.use('/api/public', publicApi);

const adminApi = require('./routes/adminApi')(db, upload);
// In a real production scenario, you would wrap this with authenticateAdmin
// app.use('/api/admin', authenticateAdmin, adminApi);
app.use('/api/admin', adminApi);

// Fallback legacy content route for old frontend logic
app.get('/api/content', (req, res) => {
    db.all("SELECT key, value FROM content", [], (err, rows) => {
        if (err || !rows) return res.json({});
        const content = {};
        rows.forEach(row => content[row.key] = row.value);
        res.json(content);
    });
});

// Restart notification system
app.post('/api/save-content', (req, res) => {
    res.json({ message: 'Saved to CMS structure instead.' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
