import { Router } from 'express'
const router = Router()
import adminControllers from '../controllers/adminController.js';
import multer from 'multer';

// MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
        // ej 345389423423-imagen.jpg
    }
});

const upload = multer({ storage: storage });

let validacionPrecio = (value) => {
    if (value < 0) {
        throw new Error('El precio no puede ser negativo')
    }
    return true
}

router.get('/', adminControllers.admin);
router.get('/create', adminControllers.createget);
router.post('/create', adminControllers.createpost);
router.get('/edit/:id', adminControllers.editidget);
router.post('/edit/:id', upload.single('imagen'), validacionPrecio, adminControllers.editidput);
router.delete('/delete/:id', adminControllers.deleteid);

export default router;