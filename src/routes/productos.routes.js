import { Router } from "express";
import { deleteProducto, getProducto, getProductos, setProducto, updateProducto } from "../controllers/productos.controller.js";
const router = Router();

router.get('/productos', getProductos);

router.get('/productos/:id', getProducto);

router.post('/productos', setProducto);

router.delete('/productos/:id', deleteProducto);

router.patch('/productos/:id', updateProducto);

export default router;