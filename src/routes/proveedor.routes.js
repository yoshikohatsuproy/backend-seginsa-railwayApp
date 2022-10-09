import { Router } from "express";
import { check } from "express-validator";

import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { deleteProveedor, getProveedor, getProveedores, insertProveedor, updateProveedor } from "../controllers/proveedor.controller.js";



const router = Router();

router.get("/proveedores", validarJWT, getProveedores);
router.get("/proveedor/:idm", validarJWT, getProveedor);

router.post(
  "/proveedor",
  [
    check("des_prov", "La descripción es obligatoria").not().isEmpty(),
    check("ruc_prov", "La descripción es obligatoria").not().isEmpty(),
    check("con_prov", "La contacto es obligatoria").not().isEmpty(),
    check("tel_prov", "La telefono es obligatoria").not().isEmpty(),
    check("cor_prov", "La correo es obligatoria").not().isEmpty(),
    validarCampos,
    validarJWT,
  ],
  insertProveedor
);

router.put(
  "/proveedor/:idp",
  [
    check("des_prov", "La descripción es obligatoria").not().isEmpty(),
    check("con_prov", "La contacto es obligatoria").not().isEmpty(),
    check("tel_prov", "La telefono es obligatoria").not().isEmpty(),
    check("cor_prov", "La correo es obligatoria").not().isEmpty(),
    validarCampos,
    validarJWT,
  ],
  updateProveedor
);

router.put("/proveedor/delete/:idm", validarJWT, deleteProveedor);

export default router;

