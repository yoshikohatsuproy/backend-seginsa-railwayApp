import { pool } from "../db.js";
import { response } from "express";
import bcrypt from "bcryptjs";
import { generarJWT } from "../helpers/jwt.js";

import { msgError } from "../helpers/messages.js";

export const login = async (req, res = response) => {
  try {
    const { cor_usuario, pas_usuario } = req.body;
    const [rows] = await pool.query("call sp_verificarCorreo(?)", [
      cor_usuario,
    ]);

    if (rows[0].length <= 0)
      return res.status(404).json({
        msg: "El correo no se encuentra registrado",
        ok: false,
      });

    const id = rows[0][0].idu;
    const idrol = rows[0][0].idrol;
    const activo = rows[0][0].activo;
    const nombre = rows[0][0].nom_usuario;
    const password = rows[0][0].pas_usuario;
    
    if (activo === 0)
    return res.status(404).json({
        ok: false,
        msg: "El usuario no está activo",
    });
    
    const validPassword = bcrypt.compareSync(pas_usuario, password)
    
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "La contraseña es incorrecta",
      });
    }

    const token = await generarJWT(id, nombre, idrol)

    return res.status(201).json({
      data: rows[0],
      msg: "Bienvenido " + nombre,
      ok: true,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: msgError,
      ok: false
    });
  }
};
