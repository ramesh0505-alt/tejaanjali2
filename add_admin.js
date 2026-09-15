const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const email1 = 'gaddlarameshbabu@gmail.com';
const email2 = 'ramesh@gmail.com';
const plainPassword = 'ramesh12';

db.serialize(() => {
    bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
        if (err) throw err;
        
        const stmt = db.prepare("INSERT INTO users (email, password) VALUES (?, ?) ON CONFLICT(email) DO UPDATE SET password=excluded.password");
        stmt.run(email1, hashedPassword);
        stmt.run(email2, hashedPassword);
        
        stmt.finalize(() => {
            console.log("Admin users added/updated successfully.");
            db.close();
        });
    });
});
