const express = require('express');
const mongoose = require('mongoose');
const keys = require("./config/keys");
const session = require("cookie-session");
const passport = require("passport");
const bodyParser = require('body-parser');

mongoose.connect(keys.mongoURI);
const app = express();
app.use(bodyParser.json());
app.use(
    session({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
const authRouter = require('./routes/authRouter')(app);
const billingRouter = require('./routes/billingRouter')(app);

require('./models/User');
require('./config/passport');
app.use('/auth', authRouter);
app.use('/api', billingRouter);

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
