const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/login', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});

// Define a schema and model for login data
const loginSchema = new mongoose.Schema({
    username: String,
    password: String,
    timestamp: { type: Date, default: Date.now }
});

const Login = mongoose.model('Login', loginSchema);

// Handle POST request to store login data
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Create a new login document
    const newLogin = new Login({
        username,
        password
    });

    // Save the document in MongoDB
    newLogin.save()
        .then(() => {
            res.status(201).json({ message: 'Login info saved successfully' });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Failed to save login info', error });
        });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
