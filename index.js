const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const passport = require('passport');
const keys = require('./config/keys');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//assign global promise to mongoose promise
mongoose.Promise = global.Promise;

//connect to mongo db
mongoose.connect(keys.mongoURI, {
   useMongoClient: true
}).then(() => {
    console.log('mongodb connected!')
}).catch(err => {
    console.log(err);
});

const app = express();

app.get('/', (req, res) => {
    res.send('It works!');
});

//load user model
require('./models/user');

// passport config
require('./config/passport')(passport);

app.use(cookieParser());

app.use(session({
    secret: 'secret cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Load routes
app.use('/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on port: ${port}`);
});
