const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log("Initializing Tejanjali CMS Database Schema...");

db.serialize(() => {
    // 1. Settings / General Content
    db.run(`CREATE TABLE IF NOT EXISTS site_settings (
        key TEXT PRIMARY KEY,
        value TEXT
    )`);

    // 2. Social Links
    db.run(`CREATE TABLE IF NOT EXISTS social_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        platform TEXT NOT NULL,
        url TEXT NOT NULL,
        display_name TEXT,
        visible INTEGER DEFAULT 1,
        display_order INTEGER DEFAULT 0
    )`);

    // 3. Homepage Content
    db.run(`CREATE TABLE IF NOT EXISTS homepage (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        section_name TEXT UNIQUE NOT NULL,
        title TEXT,
        subtitle TEXT,
        description TEXT,
        image_url TEXT,
        cta_text TEXT,
        cta_link TEXT,
        visible INTEGER DEFAULT 1
    )`);

    // 4. Journey Milestones
    db.run(`CREATE TABLE IF NOT EXISTS journey_milestones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        year TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        display_order INTEGER DEFAULT 0,
        visible INTEGER DEFAULT 1
    )`);

    // 5. Artistry Roles
    db.run(`CREATE TABLE IF NOT EXISTS artistry_roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        short_description TEXT,
        long_description TEXT,
        image_url TEXT,
        icon_svg TEXT,
        display_order INTEGER DEFAULT 0,
        visible INTEGER DEFAULT 1
    )`);

    // 6. Music / Songs
    db.run(`CREATE TABLE IF NOT EXISTS songs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        album TEXT,
        description TEXT,
        cover_image_url TEXT,
        audio_url TEXT,
        release_date TEXT,
        category TEXT,
        featured INTEGER DEFAULT 0,
        visible INTEGER DEFAULT 1,
        display_order INTEGER DEFAULT 0,
        youtube_url TEXT,
        spotify_url TEXT,
        status TEXT DEFAULT 'PUBLISHED'
    )`);

    // 7. Projects
    db.run(`CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        subtitle TEXT,
        description TEXT,
        category TEXT,
        hero_image_url TEXT,
        video_url TEXT,
        audio_url TEXT,
        year TEXT,
        client TEXT,
        featured INTEGER DEFAULT 0,
        visible INTEGER DEFAULT 1,
        display_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'PUBLISHED'
    )`);

    // 8. Project Images (One to Many)
    db.run(`CREATE TABLE IF NOT EXISTS project_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        image_url TEXT NOT NULL,
        display_order INTEGER DEFAULT 0,
        is_cover INTEGER DEFAULT 0,
        FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
    )`);

    // 9. Gallery Images
    db.run(`CREATE TABLE IF NOT EXISTS gallery_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image_url TEXT NOT NULL,
        caption TEXT,
        category TEXT,
        featured INTEGER DEFAULT 0,
        visible INTEGER DEFAULT 1,
        display_order INTEGER DEFAULT 0
    )`);

    // 10. Testimonials
    db.run(`CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        person_name TEXT NOT NULL,
        role TEXT,
        testimonial_text TEXT NOT NULL,
        image_url TEXT,
        rating INTEGER DEFAULT 5,
        featured INTEGER DEFAULT 0,
        visible INTEGER DEFAULT 1,
        display_order INTEGER DEFAULT 0
    )`);

    // 11. Contact Messages
    db.run(`CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        subject TEXT,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'UNREAD',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // =====================================
    // SEED INITIAL DATA
    // =====================================
    console.log("Seeding initial data to prevent empty states...");

    const seedSettings = [
        ['site_title', 'TEJANJALI | Official Music Artist'],
        ['contact_email', 'contact@tejanjaliofficial.com'],
        ['footer_description', 'Music gives a soul to the universe, wings to the mind and life to everything.']
    ];

    const stmtSettings = db.prepare(`INSERT OR IGNORE INTO site_settings (key, value) VALUES (?, ?)`);
    seedSettings.forEach(s => stmtSettings.run(s));
    stmtSettings.finalize();

    // Socials
    db.get("SELECT COUNT(*) as count FROM social_links", (err, row) => {
        if (row && row.count === 0) {
            db.run(`INSERT INTO social_links (platform, url, display_name, display_order) VALUES 
                ('Instagram', 'https://instagram.com', 'Instagram', 1),
                ('YouTube', 'https://youtube.com', 'YouTube', 2),
                ('Spotify', 'https://spotify.com', 'Spotify', 3),
                ('Facebook', 'https://facebook.com', 'Facebook', 4),
                ('X / Twitter', 'https://twitter.com', 'X', 5)`);
        }
    });

    // Artistry Roles
    db.get("SELECT COUNT(*) as count FROM artistry_roles", (err, row) => {
        if (row && row.count === 0) {
            db.run(`INSERT INTO artistry_roles (title, short_description, image_url, display_order) VALUES 
                ('Singer', 'Live Concerts & World Tours', 'https://images.unsplash.com/photo-1540039155733-d7696d487346?w=800&q=80', 1),
                ('Performer', 'Film Playback & Studio Vocals', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80', 2),
                ('Composer', 'Cultural & Corporate Galas', 'https://images.unsplash.com/photo-1507676184212-d0330a156708?w=800&q=80', 3),
                ('Executive Producer', 'Media Production', 'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=800&q=80', 4)`, () => {
                    console.log("Schema creation and seeding completed.");
                    db.close();
                });
        } else {
            console.log("Schema creation and seeding completed.");
            db.close();
        }
    });

});
