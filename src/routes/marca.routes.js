import { Router } from "express";
import { check } from "express-validator";

import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import {
  deleteMarca,
  getMarca,
  getMarcas,
  insertMarca,
  updateMarca,
} from "../controllers/marca.controller.js";

const router = Router();

router.get("/marcas", validarJWT, getMarcas);
router.get("/marcas/:idm", validarJWT, getMarca);

router.post(
  "/marca",
  [
    check("des_marca", "La descripción es obligatoria").not().isEmpty(),
    validarCampos,
    validarJWT,
  ],
  insertMarca
);

router.put(
  "/marca/:idm",
  [
    check("des_marca", "La descripción es obligatoria").not().isEmpty(),
    validarCampos,
    validarJWT,
  ],
  updateMarca
);

router.put("/marca/delete/:idm", validarJWT, deleteMarca);

export default router;
