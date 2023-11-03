import { Router } from "express";
import { deleteClientes, getCliente, getClientes, getLogin, setClientes, updateClientes } from "../controllers/clientes.controller.js";
const router = Router();

router.post('/loginC', getLogin);

router.get('/clientes', getClientes);

router.get('/clientes/:id', getCliente);

router.post('/clientes', setClientes);

router.delete('/clientes/:id', deleteClientes);

router.patch('/clientes/:id', updateClientes);

export default router;