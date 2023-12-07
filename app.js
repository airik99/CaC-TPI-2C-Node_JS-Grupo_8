import express from 'express';
import path from 'path';
import mainRoutes from './src/routes/mainRoutes.js';
import shopRoutes from './src/routes/shopRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('public'));
app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
