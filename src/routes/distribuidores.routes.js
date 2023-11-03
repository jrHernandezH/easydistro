import { Router } from "express";
import { deleteDistribuidor, getDistribuidor, getDistribuidores, setDistribuidor, updateDistribuidor, getLogin } from "../controllers/distribuidores.controller.js";

const router = Router();

router.post('/loginD', getLogin);

router.get('/distribuidores', getDistribuidores);

router.get('/distribuidores/:id', getDistribuidor);

router.post('/distribuidores', setDistribuidor);

router.patch('/distribuidores/:id', updateDistribuidor);

router.delete('/distribuidores/:id', deleteDistribuidor);

export default router;