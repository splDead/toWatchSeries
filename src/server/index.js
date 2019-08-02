const app = require('./config/express');
const os = require('os');

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
