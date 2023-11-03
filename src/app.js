import express from 'express';
import cors from 'cors';
//importaciones para las rutas de apis 
import distribuidoresRoutes from './routes/distribuidores.routes.js';
import clientesRoutes from './routes/clientes.routes.js';
import pedidosRoutes from './routes/pedidos.routes.js';
import productosRoutes from './routes/productos.routes.js';
import detallePedidosRoutes from './routes/detallepedidos.routes.js';
//importaciones de metodos que nos ayudaran con la ruta absoluta
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

//creacion de la ruta absoluta
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//app contiene toda la ejecucion de express
const app = express();
// Configurar CORS
app.use(cors());
const corsOptions = {
    origin: 'http//192.168.101.6:3000', // Reemplaza con el dominio que deseas permitir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

//Este metodo permite que nodejs pueda leer los JSON
app.use(express.json());
//Settings para ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//settings para la carpeta publica
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));

//Estos métodos son las rutas creadas para consumir las diferentes APIs
app.use('/api', distribuidoresRoutes); //api para distribuidores CRUD
app.use('/api', clientesRoutes); //api para clientes CRUD
app.use('/api', pedidosRoutes); //api para pedidos CRUD
app.use('/api', productosRoutes); //api para productos CRUD
app.use('/api', detallePedidosRoutes); //api para detalles de los pedidos CRUD

//ruta para ingresar a la tienda de tiendas
app.use('/store', (req, res) => {
    res.render('store');
});
//ruta para mostrara la tienda
app.get('/tienda', (req, res) => {
    const tienda = {
        nombre: req.query.nombre,
        direccion: req.query.direccion,
        telefono: req.query.telefono,
    };

    // Obtener productos de la tienda (puedes modificar esto según tu lógica)

    res.render('tienda', { tienda });
});
//ruta para registrar distribuidores
app.use('/registro', (req, res) => {
    res.render('registro');
})
app.use('/login', (req, res) => {
    res.render('login');
})

//Este método manda un mensaje por si la página no es encontrada
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'public', 'error404.html'));
})

export default app;
