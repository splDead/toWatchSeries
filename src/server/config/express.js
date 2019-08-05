const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const methodOverride = require('method-override');
const csp = require('express-csp-header');

const constant = require('./directory');

const app = express();

require('dotenv').config();

app.use(express.static(constant.distDir));
app.use(express.static(constant.assetsDir));

app.use(cors());
app.use(csp({
    policies: {
        'default-src': [csp.SELF],
        'script-src': [csp.SELF, csp.INLINE, 'somehost.com'],
        'style-src': [csp.SELF, 'mystyles.net'],
        'img-src': ['data:', 'images.com'],
        'worker-src': [csp.NONE],
        'block-all-mixed-content': true
    }
}));
app.use(helmet());
app.use(compression());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

module.exports = app;
