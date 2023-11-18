import { pool } from '../db.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//metodo para guardar imagenes 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'img');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
});
const upload = multer({ storage: storage });

export const getLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM distribuidores WHERE user = ? AND password = ?', [username, password]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Distribuidor no encontrado' });
        }

        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salió mal',
            error: error.message,
        });
    }
}

export const getDistribuidores = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM distribuidores');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}

export const getDistribuidor = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM distribuidores WHERE id_distribuidor = ?', [req.params.id]);
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Distribuidor no encontrado' });
        }
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal' });
    }
}

export const setDistribuidor = async (req, res) => {
    const uploadMiddleware = upload.single('imagen');
    uploadMiddleware(req, res, async (err) => {
        if (err) {
            console.error('Error al cargar la imagen:', err);
            res.status(500).json({ message: 'Error al cargar la imagen' });
        } else {
            // Los datos del formulario y la imagen están disponibles aquí
            const { nombre_distribuidor, direccion_distribuidor, telefono_distribuidor, correo_distribuidor, user, password, descripcion } = req.body;
            const imagen = req.file.filename;

            try {
                const [rows] = await pool.query('INSERT INTO distribuidores (nombre_distribuidor, direccion_distribuidor, telefono_distribuidor, correo_distribuidor, user, password, descripcion, imagen) VALUES (?,?,?,?,?,?,?,?)',
                    [nombre_distribuidor, direccion_distribuidor, telefono_distribuidor, correo_distribuidor, user, password, descripcion, imagen]);

                res.send({
                    id: rows.insertId,
                    nombre_distribuidor,
                    direccion_distribuidor,
                    telefono_distribuidor,
                    correo_distribuidor,
                    user,
                    password,
                    descripcion,
                    imagen,
                });
                console.log({
                    id: rows.insertId,
                    nombre_distribuidor,
                    direccion_distribuidor,
                    telefono_distribuidor,
                    correo_distribuidor,
                    user,
                    password,
                    descripcion: imagen,
                    imagen,
                });
            } catch (error) {
                res.status(500).json({ message: 'Algo salió mal' });
            }
        }
    });
};

export const deleteDistribuidor = async (req, res) => {
    try {
        const [result] = await pool.query('Delete FROM distribuidores WHERE id_distribuidor = ?', [req.params.id]);
        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Distribuidor no encontrado' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal' });
    }
}

export const updateDistribuidor = async (req, res) => {
    const { id } = req.params;
    const { nombre_distribuidor, direccion_distribuidor, telefono_distribuidor, correo_distribuidor, user, password } = req.body;
    try {
        const [result] = await pool.query('UPDATE distribuidores SET nombre_distribuidor= IFNULL(?, nombre_distribuidor), direccion_distribuidor = IFNULL(?, direccion_distribuidor), telefono_distribuidor = IFNULL(?, telefono_distribuidor), correo_distribuidor = IFNULL (?, correo_distribuidor), user = IFNULL(?, user), password = IFNULL(?, password) WHERE id_distribuidor = ?', [nombre_distribuidor, direccion_distribuidor, telefono_distribuidor, correo_distribuidor, user, password, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Distribuidor no encontrado' });
        }

        const [rows] = await pool.query('SELECT * FROM distribuidores WHERE id_distribuidor = ? ', [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Algo salio mal' });
    }
}