const path = require('path');
const app = require('./config/express');
const os = require('os');

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
