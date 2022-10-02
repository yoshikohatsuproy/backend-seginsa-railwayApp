import { Router } from "express";
import { check } from "express-validator";

import { validarJWT } from "../middlewares/validar-jwt.js";
import {validarCampos} from "../middlewares/validar-campos.js"
import { getMarcas } from "../controllers/marca.controller.js";


const router = Router();

router.get("/marcas", getMarcas);

export default router;
