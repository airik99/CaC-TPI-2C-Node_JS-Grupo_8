import {
    getUserByEmailFromDB,
    createUser
} from "../model/model.js";

const authControllers = {
    loginget: (req, res) => {
        res.render('login', {
            usuario: req.session.usuario,
            mensaje: "",
            error: false
        });
    },

    loginpost: async (req, res) => {
        const password = req.body.password
        const email = req.body.email

        const userData = await getUserByEmailFromDB(email)

        if (userData && userData.password == password && userData.esAdmin == false) {
            req.session.email = email
            res.redirect('/shop' + '?mensaje=Usuario logueado correctamente')
        }

        if (userData && userData.password == password && userData.esAdmin == true) {
            req.session.email = email
            res.redirect('/admin' + '?mensaje=Administrador logueado correctamente')
        } else {
            res.render('login', {
                mensaje: "Nombre de usuario o contraseña incorrectos",
                error: true
            });
        }
    },
    registerget: (req, res) => {
        res.render('register', {
            //usuario: req.session.usuario,
            mensaje: "",
            error: false
        });
    },
    registerpost: async (req, res) => {
        const { nombre, apellido, email, password, passwordRep } = req.body;
        console.log(req.body.nombre);
        console.log(req.body.apellido);
        console.log(req.body.email);
        console.log(req.body.password);
        console.log(req.body.passwordRep);

        try {
            // Verificar si el correo electrónico ya está registrado
            const existingUser = await getUserByEmailFromDB(email);

            if (existingUser) {
                res.render('register',
                    { error: true,
                    mensaje: 'El correo electrónico ya está registrado' })
            } else if (req.body.password != req.body.passwordRep) {
                res.render('register',
                    { error: true, 
                    mensaje: 'Las contraseñas deben coincidir' })
            } else {
                // Hashear la contraseña antes de almacenarla en la base de datos
                //const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await createUser({
                    nombre,
                    apellido,
                    email,
                    password,
                    esAdmin: false,
                });
                res.redirect('/auth/login' + '?mensaje=Usuario registrado correctamente')
            }

        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }

    },
    logoutget: (req, res) => { res.render('logout') },

    logoutpost: (req, res) => {
        req.session.destroy(err => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                res.status(500).send('Error interno del servidor');
            } else {
                res.redirect('/home' + '?mensaje=Usuario deslogueado correctamente');
            }
        })
    }
    
}

export default authControllers;