const express = require('express');
const mongoose = require('mongoose');
const keys = require("./config/keys")
const session = require("cookie-session");
const passport = require("passport");

mongoose.connect(keys.mongoURI);
const app = express();

app.use(
   session({
       maxAge: 30*24*60*60*1000,
       keys: [keys.cookieKey]
   })
);
app.use(passport.initialize());
app.use(passport.session());
const authRouter = require('./routes/authRouter')(app);

require('./models/User');
require('./config/passport');

app.use('/auth', authRouter);
app.get("/", (req, res) => {
    res.send({
        hi: 'there'
    })
});
const PORT = process.env.PORT || 5000; 
app.listen(PORT);