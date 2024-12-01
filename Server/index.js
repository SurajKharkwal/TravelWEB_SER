
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Node.js Auth Server!');
});

app.use(express.static(path.join(__dirname, '../client/dist/')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(5000, () => {
  console.log(`Server running on port ${5000}`);
});

