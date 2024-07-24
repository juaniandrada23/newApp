import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3001', // Cambia esto al origen de tu frontend
    credentials: true // Permitir que las cookies sean enviadas
}));

app.use(bodyParser.json());
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/auth', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

