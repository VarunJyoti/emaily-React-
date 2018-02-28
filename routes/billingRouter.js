var express = require('express');
var keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
var stripe = require('stripe')(keys.stripeSecretKey);
module.exports = function (app) {
    var router = express.Router();
    router.use(requireLogin);
    router.route('/stripe')
        .post(async(req, res) => {
            const charge = await stripe.charges.create({
                amount: 500,
                currency: "usd",
                source: req.body.id, // obtained with Stripe.js
                description: "Charge for olivia.anderson@example.com"
            });
            req.user.credits += 5;
            const user = await req.user.save()
            res.send(user);
        });

    return router;
}
