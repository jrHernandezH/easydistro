import { pool } from '../db.js';

export const getLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM clientes WHERE user = ? AND password = ?', [username, password]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal',
            error: error.message, // Puedes incluir información detallada del error si es necesario
        });
    }
}

export const getClientes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const getCliente = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [req.params.id]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal' });
    }
}

export const setClientes = async (req, res) => {
    const { nombre_cliente, direccion_cliente, telefono_cliente, correo_cliente, user, password } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO clientes (nombre_cliente, direccion_cliente, telefono_cliente, correo_cliente, user, password) Values  (?,?,?,?,?,?)', [nombre_cliente, direccion_cliente, telefono_cliente, correo_cliente, user, password]);
        res.send({
            id: rows.insertId,
            nombre_cliente,
            direccion_cliente,
            telefono_cliente,
            correo_cliente,
            user,
            password
        });
        console.log(req.body);
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal' });
    }
}

export const deleteClientes = async (req, res) => {
    try {
        const [result] = await pool.query('Delete  FROM clientes WHERE id_cliente = ?', [req.params.id]);

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal' });
    }
}

export const updateClientes = async (req, res) => {
    const { id } = req.params;
    const { nombre_cliente, direccion_cliente, telefono_cliente, correo_cliente, user, password } = req.body;
    try {
        const [result] = await pool.query('UPDATE clientes SET nombre_cliente = IFNULL(?, nombre_cliente), direccion_cliente = IFNULL(?, direccion_cliente), telefono_cliente = IFNULL(?, telefono_cliente), correo_cliente = IFNULL(?, correo_cliente), user = IFNULL(?, user), password = IFNULL(?, password) WHERE id_cliente = ?', [nombre_cliente, direccion_cliente, telefono_cliente, correo_cliente, user, password, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' })
        }

        const [rows] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ? ', [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal' });
    }
}
