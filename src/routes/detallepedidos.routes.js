import { Router } from "express";
import {
    deleteDetallePedido,
    getDetallePedido,
    getDetallesPedidos,
    setDetallePedido,
    updateDetallePedido,
} from "../controllers/detallepedidos.controller.js";

const router = Router();

router.get('/detallesPedidos', getDetallesPedidos);
router.get('/detallesPedidos/:id', getDetallePedido);
router.post('/detallesPedidos', setDetallePedido);
router.patch('/detallesPedidos/:id', updateDetallePedido);
router.delete('/detallesPedidos/:id', deleteDetallePedido);

export default router;
