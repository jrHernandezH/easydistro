import { pool } from '../db.js';

export const getPedidos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM pedidos');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const getPedido = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM pedidos WHERE id_pedido = ?', [req.params.id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal' });
    }
}

export const setPedido = async (req, res) => {
    const { cliente_pedido, distribuidor_pedido, fecha_hora, estado_pedido, total_pagar_pedido } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO pedidos (cliente_pedido, distribuidor_pedido, fecha_hora, estado_pedido, total_pagar_pedido) values (?,?,?,?,?)', [cliente_pedido, distribuidor_pedido, fecha_hora, estado_pedido, total_pagar_pedido]);

        res.send({
            id: rows.insertId,
            cliente_pedido,
            distribuidor_pedido,
            fecha_hora,
            estado_pedido,
            total_pagar_pedido
        });
        console.log(req.body);
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal' });
    }
}

export const deletePedido = async (req, res) => {
    try {
        const [result] = await pool.query('Delete  FROM pedidos WHERE id_pedido = ?', [req.params.id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal' });
    }
}

export const updatePedido = async (req, res) => {
    const { id } = req.params;
    const { cliente_pedido, distribuidor_pedido, fecha_hora, estado_pedido, total_pagar_pedido } = req.body;
    try {
        const [result] = await pool.query('UPDATE pedidos SET cliente_pedido = IFNULL(?, cliente_pedido), distribuidor_pedido = IFNULL(?, distribuidor_pedido), fecha_hora = IFNULL(?, fecha_hora), estado_pedido = IFNULL(?, estado_pedido), total_pagar_pedido = IFNULL(?, total_pagar_pedido) WHERE id_pedido = ?', [cliente_pedido, distribuidor_pedido, fecha_hora, estado_pedido, total_pagar_pedido, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' })
        }

        const [rows] = await pool.query('SELECT * FROM pedidos WHERE id_pedido = ? ', [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal' });
    }
}
