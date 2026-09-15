const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Seed Milestones
    db.run("DELETE FROM milestones");
    const insertMilestone = db.prepare("INSERT INTO milestones (order_index, age_year, title, description, photo_id) VALUES (?, ?, ?, ?, ?)");
    insertMilestone.run(1, "AGE 8", "Musical journey begins.", "Started formal training and discovered a lifelong passion for music and vocal performance.", null);
    insertMilestone.run(2, "EARLY YEARS", "Competitions and musical development.", "Participated in numerous state-level competitions, developing stage presence and classical foundations.", null);
    insertMilestone.run(3, "INDUSTRY", "Working with Legendary Music Director Koti.", "Became the Chief Associate, learning the intricacies of music direction, composition, and production.", 4);
    insertMilestone.run(4, "CREATIVE EVOLUTION", "Singing, lyrics, composition and performance.", "Expanded artistic horizons beyond singing to include writing lyrics and composing original tracks.", null);
    insertMilestone.run(5, "GAMA DUBAI", "International performance.", "Performed live at the prestigious GAMA Awards in Dubai, representing South Indian musical heritage.", 7);
    insertMilestone.run(6, "TODAY", "New songs, collaborations, live shows and creative projects.", "Continuing to release original music, perform globally, and execute major creative projects like Vasavi Sakshatkaram.", 1);
    insertMilestone.finalize();

    console.log("Milestones seeded.");
});
