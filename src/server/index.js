const path = require('path');
const os = require('os');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let users = [
    {
        id: 1,
        email: 'test1@example.com',
        password: 'test1'
    }
];

const app = express();

require('./utils/ping');

require('dotenv').config();

app.use(express.static('dist'));

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/getUsername', (req, res) => {
    if (!users[0].success) {
        res.send({ username: os.userInfo().username })
    } else {
        res.send({ username: users[0].email, success: true });
    }
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(el => el.email === email);

    if (user) {
        if (user.password === password) {
            const token = jwt.sign({
                id: user.id,
                email
            }, process.env.TOKEN_SECRET_KEY);

            users = users.map(el => el.id === user.id ? ({ ...el, token, success: true }) : el);

            res.json({
                success: true,
                token,
                email
            });
        } else {
            console.log('Authentication failed. Invalid password.');

            res.status(403).json({
                success: false,
                message: 'Authentication failed. Invalid password.'
            });
        }
    } else {
        console.log('Invalid username or password.');

        res.status(403).json({
            success: false,
            message: 'Invalid username or password.'
        });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

module.exports = app;
