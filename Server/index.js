require("dotenv").config();
const { neon } = require("@neondatabase/serverless");
const path = require('path');
const express = require('express');
const sql = neon('postgresql://neondb_owner:EFP1HBR8XYfD@ep-soft-shape-a5fyvx9x.us-east-2.aws.neon.tech/neondb?sslmode=require');
const { createTable, CreateBookTable, WriteDataBook, WriteUserData } = require("./src/connect-db");
const app = express();
app.use(express.json());
const port = 3000;
app.post('/SignUp', async (req, res) => {
  await createTable();
  const data = req.body;
  await WriteUserData(data);
  res.send("Sign Up Successful");
});
app.post('/BookForm', async (req, res) => {
  await CreateBookTable();
  const data = req.body;
  await WriteDataBook(data);
  res.send("Booking Successful");
});
app.post('/Login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await sql(`
      SELECT * FROM Users WHERE email ILIKE $1
    `, [email.trim()]);
    if (result.length === 0) {
      return res.status(400).json({ message: 'User does not exist.' });
    }
    const user = result[0];  
    console.log('Found User:', user);
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid password.' });
    }
    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'An error occurred during login.' });
  }
});
app.use(express.static(path.join(__dirname, '../client/dist/')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
