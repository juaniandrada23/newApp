const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = (req, res) => {
    const { email, password, roles } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    User.create({ email, password: hashedPassword, roles }, (err, userId) => {
        if (err) return res.status(500).send('Error registering the user');
        res.status(201).send({ userId });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, user) => {
        if (err || !user) return res.status(404).send('User not found');

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send('Invalid password');

        const token = jwt.sign({ id: user.id, roles: user.roles }, 'secret_key', { expiresIn: 86400 });
        req.session.token = token;

        res.status(200).send({ token });
    });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.status(200).send('Logged out');
};
