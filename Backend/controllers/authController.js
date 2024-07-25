import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const register = (req, res) => {
    const { email, password, role } = req.body;
    console.log('Attempting to register user:', email, role);

    const hashedPassword = bcrypt.hashSync(password, 8);

    User.findRoleByName(role, (err, roleId) => {
        if (err || !roleId) {
            console.error('Role not found');
            return res.status(400).send('Rol no encontrado');
        }

        User.create({ email, password: hashedPassword }, (err, userId) => {
            if (err) {
                console.error('Error registering the user:', err);
                return res.status(500).send('Usuario ya registrado con ese email');
            }

            User.assignRole(userId, roleId, (err) => {
                if (err) {
                    console.error('Error assigning role:', err);
                    return res.status(500).send('Error asignando rol');
                }
                res.status(201).send({ userId });
            });
        });
    });
};

const login = (req, res) => {
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

        User.findRolesByUserId(user.id, (err, roles) => {
            if (err) {
                console.log('Error fetching roles', err);
                return res.status(500).send('Error fetching roles');
            }

            const token = jwt.sign({ id: user.id, roles: roles.map(role => role.name) }, 'secret_key', { expiresIn: '1h' });
            req.session.token = token;
            console.log('Login successful');
            res.status(200).send({ token, email: user.email, roles: roles.map(role => role.name), nombre: user.nombre, apellido: user.apellido, imagen: user.image, numId: user.id  });
        });
    });
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Error logging out');
        }
        res.status(200).send('Logged out');
        console.log('Logout!!');
    });
};

export default {
    register,
    login,
    logout
};
