const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const passport = require('passport');

const app = express();

app.get('/', (req, res) => {
    res.send('It works!');
});

// passport config
require('./config/passport')(passport);

//Load routes
app.use('/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on port: ${port}`);
});
