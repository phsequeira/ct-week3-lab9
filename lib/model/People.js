const pool = require('../utils/pool.js');


module.exports = class People {
    id;
    name;
    age;
    img;
    snap;
    phone;
    insta;

    constructor(row) {
        this.id = row.id,
        this.name = row.name,
        this.age = row.age,
        this.img = row.img,
        this.snap = row.snap,
        this.phone = row.phone,
        this.insta = row.insta
    }

    static async insert({ name, age, img, snap, phone, insta }) {
        const { rows } = await pool.query('INSERT INTO peoples (name, age, img, snap, phone, insta) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, age, img, snap, phone, insta])

        return new People(rows[0])
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM peoples');
    
        return rows.map((row) => new People(row));
      }

    static async delete({ name }) {
        const { rows } = await pool.query('DELETE FROM peoples WHERE name=$1 RETURNING *', [name])

        return rows.map((row) => new People(row));
    }
    };