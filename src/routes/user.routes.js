import { Router } from "express";
import { check } from "express-validator";

import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";

import {
  cambiarContraseniaUsuario,
  deleteUsuario,
  getUsuarioById,
  getUsuarios,
  insertUsuario,
  updateUsuario,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/usuarios", validarJWT, getUsuarios);
router.get("/usuario/:idu", validarJWT, getUsuarioById);
router.post(
  "/usuario",
  [
    check("nom_usuario", "El nombre es obligatorio").not().isEmpty(),
    check("ape_usuario", "El apellido es obligatorio").not().isEmpty(),
    check("tel_usuario", "El teléfono es obligatorio").not().isEmpty(),
    check("car_usuario", "El cargo es obligatorio").not().isEmpty(),
    check("cor_usuario", "El email es obligatorio").isEmail(),
    check("pas_usuario", "El password es obligatorio").not().isEmpty(),
    check("pas_usuario", "El password debe tener 8 caracteres").isLength({
      min: 8,
      max: 8,
    }),
    validarCampos,
    validarJWT,
  ],
  insertUsuario
);
router.put(
  "/usuario/:idu",
  [
    check("nom_usuario", "El nombre es obligatorio").not().isEmpty(),
    check("ape_usuario", "El apellido es obligatorio").not().isEmpty(),
    check("tel_usuario", "El teléfono es obligatorio").not().isEmpty(),
    check("car_usuario", "El cargo es obligatorio").not().isEmpty(),
    validarCampos,
    validarJWT,
  ],
  updateUsuario
);

router.put("/usuario/cambiar/:idu", 
[
  check("pas_usuario", "El password es obligatorio").not().isEmpty(),
  check("pas_usuario", "El password debe tener 8 caracteres").isLength({
    min: 8,
    max: 8,
  }),
  validarCampos,
  validarJWT,
], cambiarContraseniaUsuario);

router.put("/usuario/delete/:idu", validarJWT, deleteUsuario);
export default router;

/*
"nom_usuario":"DIEGO",
  "ape_usuario":"URRUTIA",
  "tel_usuario":"912345785",
  "car_usuario":"DBA",
  "cor_usuario":"DURRUTIA@GMAIL.COM",
  "pas_usuario":"12345678",
 */
