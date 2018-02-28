module.exports = function(req, res, next){
    if(!req.user){
        return res.status(403).send({error: "User not logged in"});
    }
    next();
}