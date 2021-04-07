const pool = require('../utils/pool.js');


module.exports = class Event {
    id;
    title;
    disc;
    img;
    time;

    constructor(row) {
        this.id = row.id,
        this.title = row.title,
        this.disc = row.disc,
        this.img = row.img,
        this.time = row.time
    }

    static async insert({ title, disc, img, time }) {
        const { rows } = await pool.query('INSERT INTO peoples (title, disc, img, time) VALUES ($1, $2, $3, $4) RETURNING *', [title, disc, img, time])

        return new People(rows[0])
    }
}