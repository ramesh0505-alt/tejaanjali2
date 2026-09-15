const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS social_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        platform TEXT,
        url TEXT,
        display_name TEXT,
        is_visible INTEGER DEFAULT 1,
        order_index INTEGER DEFAULT 0
    )`);
    
    // Seed social links
    db.run("DELETE FROM social_links");
    db.run("INSERT INTO social_links (platform, url, display_name, is_visible, order_index) VALUES ('Instagram', 'https://instagram.com/tejanjali', '@tejanjali', 1, 1)");
    db.run("INSERT INTO social_links (platform, url, display_name, is_visible, order_index) VALUES ('YouTube', 'https://youtube.com/tejanjali', 'Tejanjali Official', 1, 2)");
    db.run("INSERT INTO social_links (platform, url, display_name, is_visible, order_index) VALUES ('Spotify', 'https://spotify.com/artist/tejanjali', 'Tejanjali', 1, 3)");
    db.run("INSERT INTO social_links (platform, url, display_name, is_visible, order_index) VALUES ('Facebook', 'https://facebook.com/tejanjali', 'Tejanjali', 1, 4)");
    
    // Add default footer settings
    const stmt = db.prepare("INSERT INTO content (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value");
    stmt.run('footer_description', 'Music, expression and performance in one artistic journey.');
    stmt.run('footer_contact_email', 'tejanjali@example.com');
    stmt.run('footer_booking_label', 'CONTACT TEJANJALI');
    stmt.run('footer_copyright', '© 2026 TEJANJALI');
    stmt.run('footer_show_social', '1');
    stmt.run('footer_show_contact', '1');
    stmt.run('footer_show_nav', '1');
    stmt.finalize();
    console.log("Database updated with social_links table and footer settings.");
});
