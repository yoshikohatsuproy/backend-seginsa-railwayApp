import { pool } from "../db.js";
import { response } from "express";
import bcrypt from "bcryptjs";
import {
  msgCreate,
  msgDelete,
  msgError,
  msgListExist,
  msgNoExitID,
  msgNoList,
  msgUpdate,
} from "../helpers/messages.js";

/* Name controller para mensajes personalizados  */
const namecontroller = "Usuario";

export const getUsuarios = async (req, res = response) => {
  try {
    const [rows] = await pool.query("call sp_listarUsuarios();");

    if (rows[0].length <= 0)
      return res.status(404).json({
        msg: msgNoList(namecontroller),
        ok: false,
      });

    return res.status(201).json({
      msg: msgListExist(namecontroller),
      data: rows[0],
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: msgError,
      ok: false,
    });
  }
};

export const getUsuarioById = async (req, res = response) => {
  const { idu } = req.params;

  try {
    const [rows] = await pool.query("call sp_listarUsuarioById(?)", [idu]);

    if (rows[0].length <= 0)
      return res.status(404).json({
        msg: msgNoExitID(namecontroller),
        ok: false,
      });

    return res.status(201).json({
      msg: msgListExist(namecontroller),
      data: rows[0],
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: msgError,
      ok: false,
    });
  }
};

export const insertUsuario = async (req, res = response) => {
  try {
    const {
      nom_usuario,
      ape_usuario,
      tel_usuario,
      car_usuario,
      cor_usuario,
      pas_usuario,
      idrol,
      id_create,
    } = req.body;

    let [rows] = await pool.query("call sp_verificarCorreo(?)", [cor_usuario]);

    if (rows[0].length > 0)
      return res.status(404).json({
        msg: "El correo se encuentra duplicado",
        ok: false,
      });

    const salt = bcrypt.genSaltSync();
    const password_encriptado = bcrypt.hashSync(pas_usuario, salt);

    [rows] = await pool.query("call sp_insertUsuario(?,?,?,?,?,?,?,?)", [
      nom_usuario,
      ape_usuario,
      tel_usuario,
      car_usuario,
      cor_usuario,
      password_encriptado,
      idrol,
      id_create,
    ]);

    return res.status(201).json({
      msg: msgCreate(namecontroller),
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: msgError,
      ok: false,
    });
  }
};

export const updateUsuario = async (req, res = response) => {
  try {
    const { idu } = req.params;
    const {
      nom_usuario,
      ape_usuario,
      tel_usuario,
      car_usuario,
      idrol,
      id_update,
    } = req.body;

    const [rows] = await pool.query(
      "call sp_actualizarUsuario(?,?,?,?,?,?,?)",
      [
        nom_usuario,
        ape_usuario,
        tel_usuario,
        car_usuario,
        idrol,
        id_update,
        idu,
      ]
    );

    return res.status(201).json({
      msg: msgUpdate(namecontroller),
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: msgError,
      ok: false,
    });
  }
};

export const deleteUsuario = async (req, res = response) => {
  try {
    const { idu } = req.params;
    const { id_update } = req.body;

    const [rows] = await pool.query("call sp_eliminarUsuario(?,?)", [
      idu,
      id_update,
    ]);

    return res.status(201).json({
      msg: msgDelete(namecontroller),
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: msgError,
      ok: false,
    });
  }
};

export const cambiarContraseniaUsuario = async (req, res = response) => {
  try {
    const { idu } = req.params;
    const { pas_usuario, id_update } = req.body;

    const salt = bcrypt.genSaltSync();
    const password_encriptado = bcrypt.hashSync(pas_usuario, salt);

    const [rows] = await pool.query("call sp_actualizarContrasenia(?,?,?)", [
      password_encriptado,
      id_update,
      idu,
    ]);

    return res.status(201).json({
      msg: "Contraseña actualizada correctamente",
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: msgError,
      ok: false,
    });
  }
};
