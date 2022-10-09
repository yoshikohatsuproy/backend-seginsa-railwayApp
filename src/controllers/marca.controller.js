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
const namecontroller = "Marca";


export const getMarcas = async (req, res = response) => {
  try {
    const [rows] = await pool.query("call sp_listarMarca();");

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

export const getMarca = async (req, res = response) => {
  try {
    const { idm } = req.params;
    const [rows] = await pool.query("call sp_listarMarcaByid(?);", [idm]);

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

export const insertMarca = async (req, res = response) => {
  try {
    const { des_marca, id_create } = req.body;

    const [rows] = await pool.query("call sp_insertarMarca(?,?);", [
      des_marca,
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

export const updateMarca = async (req, res = response) => {
  try {
    const { idm } = req.body;
    const { des_marca, id_update } = req.body;

    const [rows] = await pool.query("call sp_actualizarMarca(?,?, ?);", [
      des_marca,
      id_update,
      idm
    ]);

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

export const deleteMarca = async (req, res = response) => {
    try {
      const { idm } = req.body;
      const { id_update } = req.body;
  
      const [rows] = await pool.query("call sp_eliminarMarca(?,?);", [
        id_update,
        idm
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