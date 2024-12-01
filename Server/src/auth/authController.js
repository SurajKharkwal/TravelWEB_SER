
const bcrypt = require('bcrypt');
const { generateToken } = require('./jwtUtils');

let users = [
  { id: 1, username: 'admin', password: '$2b$10$5qCUqDiYRHk8kKPUNcA4G.dZZXufqq2foQXwCdOMrthOfSZRUnR4O' }, // Password: 'password123'
];

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Get from database
    const userExists = users.some((u) => u.username === username);
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
    };

    // push in database
    users.push(newUser);

    const token = generateToken({ id: newUser.id, username: newUser.username });
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000, // 1 hour
    });

    return res.status(201).json({ message: 'Sign up successful' });
  } catch (error) {
    console.error('SignUp Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check in database
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT and set it as a cookie
    const token = generateToken({ id: user.id, username: user.username });
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000, // 1 hour
    });
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout Function
const logout = (req, res) => {
  try {
    res.clearCookie('jwt');
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { signUp, login, logout };
