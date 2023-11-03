import { pool } from '../db.js';

export const getProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    }
}

export const getProducto = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [req.params.id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Algo salió mal' });
    }
}

export const setProducto = async (req, res) => {
    const { nombre_producto, descripcion_producto, precio_producto, cantidad_producto, distribuidor_asociado } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO productos (nombre_producto, descripcion_producto, precio_producto, cantidad_producto, distribuidor_asociado) values (?,?,?,?,?)', [nombre_producto, descripcion_producto, precio_producto, cantidad_producto, distribuidor_asociado]);

        res.send({
            id: rows.insertId,
            nombre_producto,
            descripcion_producto,
            precio_producto,
            cantidad_producto,
            distribuidor_asociado
        });
        console.log(req.body);
    } catch (error) {
        res.status(500).json({ message: 'Algo salió mal' });
    }
}

export const deleteProducto = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [req.params.id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Algo salió mal' });
    }
}

export const updateProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre_producto, descripcion_producto, precio_producto, cantidad_producto, distribuidor_asociado } = req.body;
    try {
        const [result] = await pool.query('UPDATE productos SET nombre_producto = IFNULL(?, nombre_producto), descripcion_producto = IFNULL(?, descripcion_producto), precio_producto = IFNULL(?, precio_producto), cantidad_producto = IFNULL(?, cantidad_producto), distribuidor_asociado = IFNULL(?, distribuidor_asociado) WHERE id_producto = ?', [nombre_producto, descripcion_producto, precio_producto, cantidad_producto, distribuidor_asociado, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const [rows] = await pool.query('SELECT * FROM productos WHERE id_producto = ? ', [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Algo salió mal' });
    }
}
