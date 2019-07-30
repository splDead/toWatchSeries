const express = require('express');
const next = require('next');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const uid = require('uid-safe');
const helmet = require('helmet')

const db = require('./db');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        // add headers
        server.use(helmet());

        // add session management to Express
        const sessionConfig = {
            secret: uid.sync(18),
            cookie: {
                maxAge: 86400 * 1000 // 24 hours
            },
            resave: false,
            saveUninitialized: false
        };

        passport.use(new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password',
                session: true
            },
            (username, password, done) => {
                db.users.findByUsername(username, (err, user) => {
                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }

                    if (user.password !== password) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }

                    return done(null, user);
                });
            }
        ));

        passport.serializeUser((user, done) => done(null, user.id));
        passport.deserializeUser((id, done) => {
            db.users.findById(id, (err, user) => {
                if (err) {
                    return done(err);
                }

                return done(null, user);
            });
        });

        server.use(require('body-parser').urlencoded({ extended: true }));
        server.use(session(sessionConfig));

        server.use(passport.initialize());
        server.use(passport.session());

        server.post('/login',
            passport.authenticate('local', { failureRedirect: '/login' }),
            (req, res) => {
                res.redirect('/');
            }
        );

        server.post('/profile',
            (req, res) => {
                if (req.user) {
                    res.status(200).send(req.user);
                } else {
                    res.status(200).send({ displayName: 'Anon'});
                }
            }
        );

        server.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });

        // server.get('/p/:id', (req, res) => {
        //     const actualPage = '/post';
        //     const queryParams = {
        //         title: req.params.id
        //     };
        //
        //     app.render(req, res, actualPage, queryParams);
        // });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(process.env.PORT || 9000, err => {
            if (err) {
                throw err;
            }

            console.log(`> Ready on port ${process.env.PORT}`)
        });
    })
    .catch(ex => {
        console.log(ex.stack);
        process.exit(1);
    });