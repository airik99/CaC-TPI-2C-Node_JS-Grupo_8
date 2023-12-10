import pool from '../config/database.js';


export const getUserByEmailFromDB = async (email) => {
    const [rows] = await pool.query('SELECT * FROM cuentas WHERE email = ?', [email]);
    return rows[0];
}

export const createUser = async (userData) => {
    try {
        await pool.query('INSERT INTO cuentas SET ?', [userData]);
    } catch (error) {
        console.error('Error inserting into MySQL:', error);
        throw error;
    }
}

export const getAllProductsFromDB = async () => {
    try {
        const [datos,campos] = await pool.query("SELECT * FROM productos")
        return datos
    } catch (error) {
        console.error('Error querying MySQL:', error);
        throw error;
    }
}

export const getProductByIDFromDB = async (id) => {
    try {
        const [dato] = await pool.query('SELECT * FROM productos WHERE product_id = ?', [id]);
        return dato[0]; // lo enviamos como objeto en vez de un array
    } catch (error) {
        console.error('Error querying MySQL:', error);
        throw error;
    }
}

export const addProductFromDB = async (productData) => {
    try {
        await pool.query('INSERT INTO productos SET ?', [productData]);
    } catch (error) {
        console.error('Error inserting into MySQL:', error);
        throw error;
    }
}

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