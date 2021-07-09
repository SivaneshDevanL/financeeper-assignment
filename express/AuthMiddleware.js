const jwt = require('jsonwebtoken');

function authenticator(req, res, next) {
    const {authorization} = req.headers;
    if (!authorization)
        res.status(400).json({
            message: "Authorization parameter absent"
        });
    const authToken = authorization.split(" ")[1];
    jwt.verify(authToken, process.env.SERVER_SIDE_SECURITY_KEY, (err, user) => {
        if (err)
            res.status(403).json({
                message: "Invalid auth"
            })
        req.user = user.name;
        next();
    });
}
module.exports = authenticator;