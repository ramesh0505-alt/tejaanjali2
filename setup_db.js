const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Admin Users Table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);

    // Check if admin exists, if not, create one
    db.get("SELECT * FROM users WHERE email = 'tejanjali@example.com'", (err, row) => {
        if (!row) {
            bcrypt.hash('password123', 10, (err, hashedPassword) => {
                db.run(`INSERT INTO users (email, password) VALUES ('tejanjali@example.com', '${hashedPassword}')`);
                console.log("Admin user created: tejanjali@example.com / password123");
            });
        }
    });

    // Content Table (Key-Value)
    db.run(`
        CREATE TABLE IF NOT EXISTS content (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    `);

    // Initialize default content if empty
    db.get("SELECT count(*) as count FROM content", (err, row) => {
        if (row && row.count === 0) {
            const stmt = db.prepare("INSERT INTO content (key, value) VALUES (?, ?)");
            stmt.run("hero_label", "MUSIC ARTIST");
            stmt.run("hero_name", "TEJANJALI");
            stmt.run("hero_roles", "Singer • Lyricist • Composer • Performer");
            stmt.run("hero_intro", "Music, expression and performance in one artistic journey.");
            stmt.run("hero_btn1", "Explore Her Journey");
            stmt.run("hero_btn2", "Watch Performance");
            stmt.run("hero_image", "page-01-image-01.jpeg");
            stmt.run("about_bio", "The Chief Associate of Legendary Music Director Koti. Her musical journey began at age eight...");
            stmt.finalize();
        }
    });

    // Photos Table
    db.run(`
        CREATE TABLE IF NOT EXISTS photos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            category TEXT,
            is_featured BOOLEAN DEFAULT 0,
            is_visible BOOLEAN DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Projects Table
    db.run(`
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            role TEXT,
            short_desc TEXT,
            full_desc TEXT,
            cover_image_id INTEGER,
            is_featured BOOLEAN DEFAULT 0,
            is_published BOOLEAN DEFAULT 1,
            FOREIGN KEY(cover_image_id) REFERENCES photos(id)
        )
    `);

    // Project Photos Table (Many-to-Many)
    db.run(`
        CREATE TABLE IF NOT EXISTS project_photos (
            project_id INTEGER,
            photo_id INTEGER,
            PRIMARY KEY (project_id, photo_id),
            FOREIGN KEY(project_id) REFERENCES projects(id),
            FOREIGN KEY(photo_id) REFERENCES photos(id)
        )
    `);

    // Songs Table
    db.run(`
        CREATE TABLE IF NOT EXISTS songs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT,
            description TEXT,
            cover_image_id INTEGER,
            audio_filename TEXT,
            is_featured BOOLEAN DEFAULT 0,
            is_published BOOLEAN DEFAULT 1,
            FOREIGN KEY(cover_image_id) REFERENCES photos(id)
        )
    `);

    // Milestones Table
    db.run(`
        CREATE TABLE IF NOT EXISTS milestones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_index INTEGER,
            age_year TEXT,
            title TEXT,
            description TEXT,
            photo_id INTEGER,
            FOREIGN KEY(photo_id) REFERENCES photos(id)
        )
    `);

    // Roles Table
    db.run(`
        CREATE TABLE IF NOT EXISTS roles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            icon TEXT,
            is_visible BOOLEAN DEFAULT 1
        )
    `);

    // Testimonials Table
    db.run(`
        CREATE TABLE IF NOT EXISTS testimonials (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            person_name TEXT,
            role TEXT,
            quote TEXT,
            photo_id INTEGER,
            is_featured BOOLEAN DEFAULT 0,
            is_published BOOLEAN DEFAULT 1,
            FOREIGN KEY(photo_id) REFERENCES photos(id)
        )
    `);

    // Messages Table
    db.run(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone TEXT,
            subject TEXT,
            message TEXT,
            is_read BOOLEAN DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log("Database tables initialized.");
});
