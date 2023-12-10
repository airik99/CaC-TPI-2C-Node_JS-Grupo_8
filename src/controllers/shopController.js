
import { check, validationResult } from 'express-validator';
//import productsData from '../model/products.json' assert { type: 'json' };
import productsCarrito from '../model/carritoProducts.json' assert { type: 'json' };
import {
    getAllProductsFromDB,
    getProductByIDFromDB
} from "../model/model.js";

const shopControllers = {
    //shop: (req, res)  => res.render('shop'),
    shop: async (req, res) => {
        try {
            const datos = await getAllProductsFromDB();
            res.render('shop', {
                products: datos,
                mensaje: req.query.mensaje || ""
            });
        } catch (error) {
            console.error('Error getting products:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    

    //itemid: (req, res)  => res.render('item', {
    //    product: productsData.find(product => product.product_id == req.params.id),
    //}),
    itemid: async (req, res) => {
        const productID = req.params.id;
        try {
            const product = await getProductByIDFromDB(req.params.id);
            if (product) {
                res.render('item', {
                    product: product
                })
            } else {
                res.status(404).send('Product not found');
            }
        } catch (error) {
            console.error('Error getting product:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    itemidadd: (req, res)  => res.send('Vista añadir item al carrito'),
    cartget: (req, res)  => res.render('carrito', {
        products: productsCarrito
        }),
    cartpost: (req, res)  => res.send('Vista del carrito')
}

export default shopControllers;