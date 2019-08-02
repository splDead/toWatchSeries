const http = require('http');

setInterval(function() {
    http.get('https://to-watch-series.herokuapp.com');
}, 300000); // every 5 minutes (300000)