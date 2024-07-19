const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.session.token;

    if (!token) {
        return res.status(403).send('No token provided');
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).send('Token expirado');
        }
        req.userId = decoded.id;
        req.userRoles = decoded.roles;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if (!req.userRoles.includes('admin')) {
        return res.status(403).send('Require Admin Role');
    }
    res.status(200).send('Admin content');
    next();
};

exports.isClient = (req, res, next) => {
    if (!req.userRoles.includes('client')) {
        return res.status(403).send('Require Client Role');
    }
    res.status(200).send('Client content');
    next();
};