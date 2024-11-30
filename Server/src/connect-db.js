require("dotenv").config();
const { neon } = require("@neondatabase/serverless");
const sql = neon();
const createTable = async () =>{
    await sql(`
        CREATE TABLE IF NOT EXISTS Users (
                user_id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(50) unique,
                password VARCHAR(255) NOT NULL 
        );
    `) 
};
const CreateBookTable = async () =>{
    await sql( `
        CREATE TABLE IF NOT EXISTS BookForm (
            booking_id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL, 
            email VARCHAR(100) NOT NULL, 
            phone VARCHAR(15) NOT NULL, 
            address TEXT NOT NULL, 
            location TEXT NOT NULL,
            guests INTEGER NOT NULL, 
            arrival DATE NOT NULL, 
            leaving DATE NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `)
};
const WriteDataBook = async (data) => {
    const {name, email, phone, address, location, guests, arrival, leaving } = data;
    await sql(`
        insert INTO BookForm (name, email, phone, address, location, guests, arrival, leaving)
        values ('${name}', '${email}', '${phone}', '${address}', '${location}', ${guests}, '${arrival}', '${leaving}');
    `);
};
const WriteUserData = async (data) => {
    const {name, email, password} = data;
    await sql(`
        insert INTO Users (name, email, password)
        values ('${name}','${email}', '${password}');
    `);
};
module.exports = {createTable , CreateBookTable , WriteDataBook, WriteUserData};       