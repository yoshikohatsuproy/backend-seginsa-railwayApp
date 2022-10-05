import { pool } from "../db.js";
import { response } from "express";

export const getProveedores = async (req, res = response) => {
  try {
    const [rows] = await pool.query("call sp_listarProveedores();");

    if (rows[0].length <= 0)
      return res.status(404).json({
        msg: "No existe una lista de proovedores",
        ok: false,
      });

    return res.status(201).json({
      msg: "Lista de proveedores obtenida exitosamente",
      data: rows[0],
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      msg: "Ha ocurrido un error comuníquese con su administrador",
      ok: false,
    });
  }
};