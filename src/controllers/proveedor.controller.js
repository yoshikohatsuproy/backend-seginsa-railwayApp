import { pool } from "../db.js";
import { response } from "express";
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
const namecontroller = "Proveedor";

export const getProveedores = async (req, res = response) => {
  try {
    const [rows] = await pool.query("call sp_listarProveedor();");

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

export const getProveedor = async (req, res = response) => {
  try {
    const { idp } = req.params;
    const [rows] = await pool.query("call sp_listarProveedorByid(?);", [idp]);

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

export const insertProveedor = async (req, res = response) => {
  try {
    const { ruc_prov, des_prov, con_prov, tel_prov, cor_prov, id_create } =
      req.body;
    let [rows] = await pool.query("call sp_verificarProveedor(?)", [ruc_prov]);

    if (rows[0].length > 0)
      return res.status(404).json({
        msg: "Ya existe un Proveedor con este RUC",
        ok: false,
      });

    [rows] = await pool.query("call sp_insertarProveedor(?,?,?,?,?,?);", [
      ruc_prov,
      des_prov,
      con_prov,
      tel_prov,
      cor_prov,
      id_create,
    ]);

    return res.status(201).json({
      msg: msgCreate(namecontroller),
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

export const updateProveedor = async (req, res = response) => {
  try {
    const { idp } = req.body;
    const { des_prov, con_prov, tel_prov, cor_prov, id_update } = req.body;

    const [rows] = await pool.query(
      "call sp_actualizarProveedor(?,?,?,?,?,?);",
      [idp, des_prov, con_prov, tel_prov, cor_prov, id_update]
    );

    return res.status(201).json({
      msg: msgUpdate(namecontroller),
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

export const deleteProveedor = async (req, res = response) => {
  try {
    const { idp } = req.body;
    const { id_update } = req.body;

    const [rows] = await pool.query("call sp_eliminarProveedor(?,?);", [
      id_update,
      idp,
    ]);

    return res.status(201).json({
      msg: msgDelete(namecontroller),
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
