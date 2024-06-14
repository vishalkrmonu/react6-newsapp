const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/registrationDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Define the schema
const userSchema = new mongoose.Schema({
    name: String,
    number: String,
    gender: String,
    email: String,
    password: String,
    confirmPassword: String,
});

// Define the model
const User = mongoose.model('User', userSchema);

// Serve the registration HTML file
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Handle form submission
app.post('/register', (req, res) => {
    const { myname, mynumber, mygender, myemail, mypassword, myconfirmPassword } = req.body;

    // Create a new user
    const newUser = new User({
        name: myname,
        number: mynumber,
        gender: mygender,
        email: myemail,
        password: mypassword,
        confirmPassword: myconfirmPassword,
    });

    // Save the user to the database
    newUser.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving user to database');
        } else {
            res.send('User registered successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
