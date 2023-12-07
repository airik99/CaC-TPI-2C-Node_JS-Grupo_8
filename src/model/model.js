import pool from '../config/database.js';

// export async getAllUsuariosFromDB() { } 
// Publico - admin
export const getAllProductsFromDB = async () => {
    try {
        const [datos,campos] = await pool.query("SELECT * FROM productos")
        //console.log(datos)
        //console.log(campos)
        return datos
    } catch (error) {
        console.error('Error querying MySQL:', error);
        throw error;
    }
}

// Obtener un usuario por ID
// Publico - admin
export const getProductByIDFromDB = async (id) => {
    try {
        const [dato] = await pool.query('SELECT * FROM productos WHERE product_id = ?', [id]);
        return dato[0]; // lo enviamos como objeto en vez de un array
    } catch (error) {
        console.error('Error querying MySQL:', error);
        throw error;
    }
}

// Agregar usuario - POST 
// admin
export const addProductFromDB = async (productData) => {
    try {
        await pool.query('INSERT INTO productos SET ?', [productData]);
    } catch (error) {
        console.error('Error inserting into MySQL:', error);
        throw error;
    }
}

// Editar usuario - POST
// admin
export const editProductPostFromDB = async (id, updatedProductData) => {
    try {
        await pool.query('UPDATE productos SET ? WHERE product_id = ?', [updatedProductData, id]);
        const updatedProduct = await getProductByIDFromDB(id);
        return updatedProduct;
    } catch (error) {
        console.error('Error updating MySQL:', error);
        throw error;
    }
}

// Borrar usuario 
// admin
export const deleteProductFromDB = async (id) => {
    try {
        const deletedProduct = await getProductByIDFromDB(id);
        await pool.query('DELETE FROM productos WHERE product_id = ?', [id]);
        return deletedProduct;
    } catch (error) {
        console.error('Error deleting from MySQL:', error);
        throw error;
    }
}