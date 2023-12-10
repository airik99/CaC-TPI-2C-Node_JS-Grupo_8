import { unlink } from 'node:fs';
import { check, validationResult } from 'express-validator';
import {
    getAllProductsFromDB,
    addProductFromDB,
    getProductByIDFromDB,
    editProductPostFromDB,
    deleteProductFromDB,
    getUserByEmailFromDB
} from "../model/model.js";

const requiereAdmin = (req, res, next) => {

    if (!req.session.esAdmin) {
        return res.redirect("/admin/login")
    }
    next()
}

const adminControllers = {
    admin: async (req, res) => {
        try {
            const datos = await getAllProductsFromDB();
            const email = req.session.email;
            const usuario = await getUserByEmailFromDB(email);

            if(usuario.esAdmin) {
                res.render('admin', {
                    title: 'LISTADO DE PRODUCTOS',
                    add_item: 'AGREGAR',
                    id_title: 'ID',
                    codigo_title: 'Código',
                    nombre_title: 'Nombre del Producto',
                    categoria_title: 'Categoría',
                    usuario: req.session.email,
                    products: datos,
                    mensaje: req.query.mensaje || "",
                    huboError: false  
                });
            } else {
                res.render('login', { error : true, mensaje: "Utilice credenciales de administrador para visualizar la página" })
            }
            
            //console.log(req.session.email);
        } catch (error) {
            console.error('Error getting products:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    createget: (req, res) => {
        try {
            res.render('create', {
                titulo: "CREAR NUEVO ITEM",
                huboError: false,
                errores: []
            })
        } catch (error) {
            console.error('Error adding usuario:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    createpost: async (req, res) => {
        const newProductData = req.body;
        //newProductData.imagen = req.file.filename

        try {
            const errores = validationResult(req)

            if (!errores.isEmpty()) {
                return res.render('create', {
                    titulo: "CREAR NUEVO ITEM - HUBO ERRORES",
                    huboError: true,
                    errores: errores.errors,
                })
            }
            await addProductFromDB(newProductData);
            res.redirect('/admin' + '?mensaje=Producto agregado')
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    editidget: async (req, res) => {
        const productID = req.params.id;
        try {
            const product = await getProductByIDFromDB(productID);
            if (product) {
                // res.status(200).json(usuario);
                res.render('edit', {
                    product: product,
                    huboError: false
                })
            } else {
                res.status(404).send('Product not found');
            }
        } catch (error) {
            console.error('Error getting product by ID:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    editidput: async (req, res) => {
        const productID = req.params.id;
        const updatedProductData = req.body;
        console.log(updatedProductData.product_price);
    
        // Validación del precio
        if(updatedProductData.product_price < 0 || isNaN(updatedProductData.product_price) || updatedProductData.product_price == ""){
            console.log("paso por aca");
            return res.render('edit', {
                title: 'Editar Item | Funkoshop',
                product: updatedProductData,
                huboError: true,
                errores: [{msg: "El precio debe ser un número positivo mayor a 0, no debe contener letras y no puede estar vacío"}]
              });
        }
    
        try {
          const updatedProduct = await editProductPostFromDB(productID, updatedProductData);
    
          if (updatedProduct) {
            res.redirect("/admin" + "?mensaje=Producto actualizado");
          } else {
            res.status(404).send('Producto not found');
          }
        } catch (error) {
          console.error('Error editing producto:', error);
          res.status(500).send('Internal Server Error');
          errores=[{}];
        }
      },

    deleteid: async (req, res) => {
        const productID = req.params.id;
        try {
            const deletedProduct = await deleteProductFromDB(productID);
            
            if (deletedProduct) {
                /*unlink('public/uploads/' + deletedProduct.imagen, (err) => {
                    if (err) res.send(`Ocurrió un error ${err.code}`);
                    console.log('Producto borrado');
                });*/
                // res.status(200).json(deletedUsuario);
                res.redirect("/admin" + "?mensaje=Producto Borrado");
            } else {
                res.status(404).send('Product not found');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};

export default adminControllers;