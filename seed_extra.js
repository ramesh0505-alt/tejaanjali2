const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Seed Roles
    db.run("DELETE FROM roles");
    const insertRole = db.prepare("INSERT INTO roles (title, description, icon, is_visible) VALUES (?, ?, ?, ?)");
    insertRole.run("Singer", "Vocal performance and musical expression across varied genres.", "♫", 1);
    insertRole.run("Lyricist", "Crafting meaningful poetry and lyrics for original compositions.", "✎", 1);
    insertRole.run("Composer", "Creating original musical arrangements and melodies.", "𝄞", 1);
    insertRole.run("Performer", "Captivating live audiences with high-energy stage presence.", "★", 1);
    insertRole.run("Artist", "Expressing creativity through multidisciplinary art forms.", "🎨", 1);
    insertRole.run("Choreographer", "Designing and directing dance performances.", "💃", 1);
    insertRole.run("Executive Producer", "Managing the creative and financial execution of major projects.", "🎬", 1);
    insertRole.run("Anchor", "Hosting and presenting major cultural events and shows.", "🎤", 1);
    insertRole.finalize();

    // Seed Testimonials
    db.run("DELETE FROM testimonials");
    const insertTestimonial = db.prepare("INSERT INTO testimonials (person_name, role, quote, photo_id, is_featured, is_published) VALUES (?, ?, ?, ?, ?, ?)");
    // Use photo 1 (Tejanjali performance) as placeholder for Anna Katrina if needed, or null
    insertTestimonial.run(
        "Anna Katrina Marchesi", 
        "Event Director, GAMA Dubai", 
        "Tejanjali's performance was nothing short of mesmerizing. Her voice carries a unique depth that captivates the entire audience.",
        null, 1, 1
    );
    insertTestimonial.finalize();

    // Seed Settings (Content Table)
    const stmt = db.prepare("INSERT INTO content (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value");
    stmt.run("contact_email", "tejanjali@example.com");
    stmt.run("contact_phone", "+91 98765 43210");
    stmt.run("contact_location", "Hyderabad, India");
    stmt.run("social_instagram", "https://instagram.com/tejanjali");
    stmt.run("social_youtube", "https://youtube.com/tejanjali");
    stmt.run("social_facebook", "https://facebook.com/tejanjali");
    stmt.run("website_title", "TEJANJALI");
    stmt.run("website_description", "Official Music Artist & Executive Producer Portfolio");
    stmt.run("footer_text", "© 2026 Tejanjali. All Rights Reserved.");
    stmt.run("featured_project_id", "2"); // Vasavi Sakshatkaram
    stmt.run("featured_song_id", "1");
    stmt.run("featured_testimonial_id", "1");
    stmt.finalize();

    console.log("Extra database tables seeded.");
});
