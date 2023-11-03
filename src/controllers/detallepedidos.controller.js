import { pool } from '../db.js';

// Obtener todos los detalles de pedidos
export const getDetallesPedidos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM DetallesPedidos');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal'
        });
    }
}

// Obtener un detalle de pedido por su ID
export const getDetallePedido = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM DetallesPedidos WHERE id_detalle = ?', [req.params.id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        }

        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Algo salió mal' });
    }
}

// Crear un nuevo detalle de pedido
export const setDetallePedido = async (req, res) => {
    const { pedido_detalle, producto_detalle, cantidad_detalle, precio_unitario_detalle } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO DetallesPedidos (pedido_detalle, producto_detalle, cantidad_detalle, precio_unitario_detalle) VALUES (?,?,?,?)', [pedido_detalle, producto_detalle, cantidad_detalle, precio_unitario_detalle]);

        res.send({
            id: rows.insertId,
            pedido_detalle,
            producto_detalle,
            cantidad_detalle,
            precio_unitario_detalle
        });
        console.log(req.body);
    } catch (error) {
        res.status(500).json({ message: 'Algo salió mal' });
    }
}

// Eliminar un detalle de pedido por su ID
export const deleteDetallePedido = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM DetallesPedidos WHERE id_detalle = ?', [req.params.id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Algo salió mal' });
    }
}

// Actualizar un detalle de pedido por su ID
export const updateDetallePedido = async (req, res) => {
    const { id } = req.params;
    const { pedido_detalle, producto_detalle, cantidad_detalle, precio_unitario_detalle } = req.body;
    try {
        const [result] = await pool.query('UPDATE DetallesPedidos SET pedido_detalle = IFNULL(?, pedido_detalle), producto_detalle = IFNULL(?, producto_detalle), cantidad_detalle = IFNULL(?, cantidad_detalle), precio_unitario_detalle = IFNULL(?, precio_unitario_detalle) WHERE id_detalle = ?', [pedido_detalle, producto_detalle, cantidad_detalle, precio_unitario_detalle, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Detalle de pedido no encontrado' });
        }

        const [rows] = await pool.query('SELECT * FROM DetallesPedidos WHERE id_detalle = ? ', [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Algo salió mal' });
    }
}
