import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { check } from "express-validator";
import {validarCampos} from "../middlewares/validar-campos.js"

const router = Router();

router.post("/auth",[
    check("cor_usuario", "El email es obligatorio").isEmail(),
    check("pas_usuario", "El password es obligatorio").not().isEmpty(),
    check("pas_usuario", "El password debe tener 8 caracteres").isLength({
      min: 8,
      max: 8,
    }),
    validarCampos
], login);

export default router;
