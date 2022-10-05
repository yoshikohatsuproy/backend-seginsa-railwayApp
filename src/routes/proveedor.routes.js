import { Router } from "express";
import { check } from "express-validator";

import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { getProveedores } from "../controllers/proveedor.controller.js";


const router = Router();

router.get('/proveedores', validarJWT, getProveedores)


export default router
