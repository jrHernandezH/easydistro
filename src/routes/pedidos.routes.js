import { Router } from "express";
import { deletePedido, getPedido, getPedidos, setPedido, updatePedido } from "../controllers/pedidos.controller.js";
const router = Router();

router.get('/pedidos', getPedidos);

router.get('/pedidos/:id', getPedido);

router.post('/pedidos', setPedido);

router.delete('/pedidos/:id', deletePedido);

router.patch('/pedidos/:id', updatePedido);

export default router;