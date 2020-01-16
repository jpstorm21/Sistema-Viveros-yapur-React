import path from 'path';
import Express from 'express';
import Session from 'express-session';
import CookieParser from 'cookie-parser';
import BodyParser from 'body-parser';
import MethodOverride from 'method-override';
import Pg from 'pg';
import ConnectPg from 'connect-pg-simple';
import Passport from 'passport';
import user from './models/user';
import config from './config.json';
import { basename, client } from './routes/routes.json';
import authRoutes from './routes/auth';
import apiRoutes from './routes/api';

const app = Express();

// Set view engine and views path directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Tell the app to look for static files in these directories
app.use(Express.static(path.join(__dirname, 'static')));

app.use(MethodOverride());
// Tell the app to parse HTTP body messages
app.use(BodyParser.urlencoded({ /*limit: '2mb',*/ extended: false }));

// Initialize session options
const pgSession = ConnectPg(Session);
app.use(CookieParser());
app.use(Session({
  store: new pgSession({
    pg: Pg,
    conString: config.dbUri,
    tableName: 'session',
    schemaName: 'public'
  }),
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
  expires : new Date(Date.now() + 3600000), // 1 Hour
  cookie: { httpOnly: true, secure: false } // With secure: true can't access the session stored
}));

// Pass the passport middleware
app.use(Passport.initialize());
app.use(Passport.session());

// Load passport strategies
Passport.use(user.createStrategy());
Passport.serializeUser(user.serializeUser());
Passport.deserializeUser(user.deserializeUser());

/**
 * Check if user is logged
 */
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  res.status(401).json({
    error: 'Unauthorized access',
    message: 'User must be logged to access the specified URI'
  });
};

// Routes
app.use(`${basename}/auth`, authRoutes);
app.use(`${basename}/api`, isAuthenticated, apiRoutes);

app.get(`${basename}*`, (req, res) => {
  if (!req.isAuthenticated() && req.path != `${basename}${client.login}`)
    res.redirect(`${basename}${client.login}`);
  else
    res.render('index');
});

if (basename != '') {
  app.get('*', (req, res) => {
    res.redirect(`${basename}${req.path}`);
  });
}

const port = process.env.NODE_PORT || 3006;

app.listen(port, err => {
  console.log(err || `Server is running on port ${port}`);
});