const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.session.token;
    if (!token) return res.status(403).send('No token provided');

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) return res.status(500).send('Failed to authenticate token');
        req.userId = decoded.id;
        req.userRole = decoded.roles;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') return res.status(403).send('Require Admin Role');
    next();
};
