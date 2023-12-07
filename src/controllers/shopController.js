
import productsData from '../model/products.json' assert { type: 'json' };
import productsCarrito from '../model/carritoProducts.json' assert { type: 'json' };

const shopControllers = {
    shop: (req, res)  => res.render('shop'),
    itemid: (req, res)  => res.render('item', {
        product: productsData.find(product => product.product_id == req.params.id),
    }),
    itemidadd: (req, res)  => res.send('Vista añadir item al carrito'),
    cartget: (req, res)  => res.render('carrito', {
        products: productsCarrito
        }),
    cartpost: (req, res)  => res.send('Vista del carrito')
}

export default shopControllers;