const express = require('express');
const session = require('express-session');

const app = express();

// Configure session middleware
app.use(
    session({
        secret: 'your-secret-key', // Replace with a secure, random key
        resave: false,            // Prevent saving session if not modified
        saveUninitialized: false, // Prevent saving uninitialized sessions
        cookie: { secure: false } // Set to true if using HTTPS
    })
);

// Route to set session data
app.get('/set-session', (req, res) => {
    req.session.username = 'JohnDoe';
    req.session.role = 'Admin';
    res.send('Session data has been set.');
});

// Route to access session data
app.get('/get-session', (req, res) => {
    if (req.session.username) {
        res.send(`Username: ${req.session.username}, Role: ${req.session.role}`);
    } else {
        res.send('No session data found.');
    }
});

// Route to track the number of visits
app.get('/count', (req, res) => {
    if (!req.session.count) {
        req.session.count = 1; // Initialize count
    } else {
        req.session.count++; // Increment count
    }
    res.send(`You have visited this page ${req.session.count} times.`);
});

// Route to destroy session
app.get('/destroy-session', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send('Error destroying session.');
        } else {
            res.send('Session destroyed.');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
