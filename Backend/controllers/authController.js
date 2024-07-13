const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = (req, res) => {
    const { email, password, role } = req.body;
    console.log('Attempting to register user:', email, role);

    const hashedPassword = bcrypt.hashSync(password, 8);

    // Buscar el ID del rol proporcionado
    User.findRoleByName(role, (err, roleId) => {
        if (err || !roleId) {
            console.error('Role not found');
            return res.status(400).send('Role not found');
        }

        // Crear el usuario
        User.create({ email, password: hashedPassword }, (err, userId) => {
            if (err) {
                console.error('Error registering the user:', err);
                return res.status(500).send('Error registering the user');
            }

            // Asignar el rol al usuario
            User.assignRole(userId, roleId, (err) => {
                if (err) {
                    console.error('Error assigning role:', err);
                    return res.status(500).send('Error assigning role');
                }
                res.status(201).send({ userId });
            });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    console.log('Attempting login with:', email);

    User.findByEmail(email, (err, user) => {
        if (err || !user) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            console.log('Invalid password');
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: 60 });
        req.session.token = token;
        console.log('Login successful');
        res.status(200).send({ token });
    });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.status(200).send('Logged out');
};
