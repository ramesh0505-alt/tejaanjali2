const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const heroImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBm42Sh4zjBXdXRo7ZcovnzMrt826e93QRKcYpFB5QYdjJPVnovgQBazTT6Ha19esJOnZDaGLmJnQfQb5ipQvu-ridFnowJXMWDHj-rdPsIqZGcs1aqZQDeDcoqV8AtLUHSLLdZTN7bygoEnm7sjiR7dB7X0Z23w4o04l5qH0qKWip4TeNby_KtM0lzEr5xWBMVfbluATrPlOugZRMvI-lZbAD3DZ72srAxuuYp1bzqNeTxLRANadMh9SZ__3tTefl7nbs';
const vasaviImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfjSMODmoVzbnbK6qm0DyLQPXurUtE4kHT3e3SudpvFvQqW_3ZKE7K4GbzJPvuWwEev6bWFpKgA8KTL3i7q-J8iDj4cMg_AN9NAjWWYLfK4FQkaVMstK9Mf9XaFkiqdH-zfsK_O4Dq1zmbd9cRkLnhEgsMHh_6AcO1XX_zIqV0tjybTsObc1FraisVqrTr6x-lENywaEprt2YJ_tNgTGWY1zHnB7NBr_ZBTmRFCPMpaS3OG0Bm6amK9DVm9km3zdm-tDE';
const portraitImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5LuMhSqFMv38dOKSC1-PbIiT8hRapuumBtBN_w6q5VNF-yjkcSPKj43GTwfimjmNkD2je6-0fyAoSKuwWsM-lYQoz4BXBuiaypZ5YUXlTrkGT9mijHJaX5ggr2juenwPTVY8x0wSeQC7zhKaQS55G1eDerDU_XuPIB7Khsuzsn99p-eCw5pqcixcWwF8xuA5IOyrFkyP3vgtyZJgzWO9fqVJlmzK_vhL0OE6lupPLejcbWuWvHp4J8GIZLbxVUEAjzQ8';
const studioImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfKkRkcObJc9LI6QDBjMZTPogkWydxfOhtdzzhNWl0N5e9nZbIQ4zcER2ZoOD1Zywbgl7jRHgZuxqE1UifPKmM9KC2DSAx9cEQ6uveNgC0B0xONTi1G2TTyjAX98P910IXHtupARIANHBZfgowL49Ksb01VyBkmtck1XSgVl50XR-hTpGd27U6eA60rGGDWTAu1aXaarvlgYVbjku3d2m2mVs35PSGabGlxJ_wJnHKUO8ZkHiws7L-EU1l8AhEq32tUZg';
const guitarImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJD0J1NbpgJh6oiSu6I79GhUYIEQ3BxXfbJBJYWOwG-VzAKJoUcyZlGMivyHIKA1CQwKVb23rtx-FB1GNu6EbYLz2FOZ4Vm6_gPutI-tTQsyke4D4AMtWPXc3rWWHJAtCsAe5yRNKSnfmcgc5InaJCGhSai-rUceD3IP6t84RVAWxlYwLWfFwBrPFELYDg8bnPHp-CQ8_gKZGxu7NKmUG3VrVK5s3MQoP8OgzwcRwRii7wPs6Zcwzi-eqJQVpNvkr1tRM';
const veenaImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuTjZ6xoVxiKUvINHjpleY4Mh3XP4UX5KiAgI_JwCuqOnUaATVzaLW3oY0kYZZJ2ZP4HViQwwE4EHQ5BqFUWge6c0vVblecwhFMOXfKptXQlp-kVT31LmTc1ZCyam1TzcSm7uRerBLELij_sPxIifB53wme3dwuNOKi_HH_1b32QdT6LMHn-6732IZo3k0X6stcQznXzC04GFX0O4ZXXzq_tQXsYi1jdnKmTEYzThcyb86_9XQEEouBo9nPpLZVGGrGQA';
const stageImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvsUGRIjTkP9Xecem4AsA6PTMYtORwC_BaxNt4ZvfpSv3r8GUXORRZybLTXJ1I07uvaK37KJy0ruyj8mmpyG2IlozwHER_50_4BK1NhNNDbg2wOJ9BBM_EEocRw4BsGRHa0J04OTDBoDnIN-JurXS0yHIwqBLuKiH26dQ2s77u49d9cFB-Qj5milmxs0_6480mYS5ajQZHZr_qXofuEoo_xml5AJ35DvBRlFQZz-OBHaLYYOfWjstUhz0oyB1an5TilOE';

db.serialize(() => {
    // Seed Photos
    db.run("DELETE FROM photos");
    const insertPhoto = db.prepare("INSERT INTO photos (id, filename, category, is_featured) VALUES (?, ?, ?, ?)");
    insertPhoto.run(1, heroImg, "Performance", 1);
    insertPhoto.run(2, vasaviImg, "Projects", 1);
    insertPhoto.run(3, portraitImg, "Studio", 1);
    insertPhoto.run(4, studioImg, "Studio", 0);
    insertPhoto.run(5, guitarImg, "Acoustic", 0);
    insertPhoto.run(6, veenaImg, "Classical", 0);
    insertPhoto.run(7, stageImg, "Performance", 1);
    insertPhoto.finalize();

    // Seed Projects
    db.run("DELETE FROM projects");
    const insertProject = db.prepare("INSERT INTO projects (title, role, short_desc, cover_image_id) VALUES (?, ?, ?, ?)");
    insertProject.run("Vasavi Sakshatkaram", "Executive Producer • Lead Actress", "Devotional magnum opus produced in association with T-Series South & 100+ performing artists.", 2);
    insertProject.run("Classical Ensemble", "Composer & Arranger", "A fusion of classical Indian instruments and modern orchestration.", 6);
    insertProject.finalize();

    // Seed Songs
    db.run("DELETE FROM songs");
    const insertSong = db.prepare("INSERT INTO songs (title, category, description, cover_image_id) VALUES (?, ?, ?, ?)");
    insertSong.run("Divine Calling (Acoustic)", "Live Acoustic", "A serene unplugged rendition of the classic composition.", 5);
    insertSong.run("Vasavi Sakshatkaram Theme", "Original Soundtrack", "Main theme song from the magnum opus.", 2);
    insertSong.run("Studio Session 01", "Studio Recording", "Live recording session with Koti sir.", 4);
    insertSong.run("Veena Fusion", "Instrumental", "An instrumental track blending Veena and modern beats.", 6);
    insertSong.run("Live at GAMA Dubai", "Live Performance", "A high-energy live performance track.", 7);
    insertSong.finalize();

    // Seed Content
    db.run("UPDATE content SET value = ? WHERE key = 'hero_image'", heroImg);
    
    // Seed Messages
    db.run("DELETE FROM messages");
    const insertMsg = db.prepare("INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)");
    insertMsg.run("GAMA Awards Committee", "contact@gama.ae", "+971 50 123 4567", "Live Performance Enquiry", "We would love to invite you to perform at the upcoming GAMA Awards in Dubai. Please let us know your availability.");
    insertMsg.run("T-Series South", "collab@tseries.in", "+91 98765 43210", "Vasavi Sakshatkaram Distribution", "Following up on the distribution timeline for the next tracks.");
    insertMsg.run("Event Organizers", "events@blr.in", "+91 88888 77777", "Bangalore Concert Booking", "Looking to book a 2-hour set for our cultural festival next month.");
    insertMsg.finalize();

    console.log("Database seeded with sample data.");
});
