const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const methodOverride = require('method-override');

const constant = require('./directory');

const app = express();

require('dotenv').config();

app.set('port', process.env.APP_PORT || 3000);
app.set('host', process.env.APP_HOST || 'localhost');

app.use(express.static(constant.distDir));

// app.use(cors());
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//         defaultSrc: ["'self'"],
//         imgSrc: ["'self'"]
//     }
// }));
app.use(compression());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(constant.assetsDir));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

module.exports = app;
