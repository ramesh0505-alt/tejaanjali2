const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

db.serialize(() => {
    const stmt = db.prepare("INSERT INTO content (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value");
    stmt.run('fx_enabled', '1');
    stmt.run('fx_hero', '1');
    stmt.run('fx_parallax', '1');
    stmt.run('fx_quality', 'Auto');
    stmt.finalize();
    console.log("Database updated with Visual Effects settings.");
});
