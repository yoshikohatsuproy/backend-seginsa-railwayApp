import { pool } from "../db.js";
import { response } from "express";

export const getMarcas = async (req, res = response) => {
    try {
      const [rows] = await pool.query("call sp_listarMarca();");
  
      if (rows[0].length <= 0)
        return res.status(404).json({
          msg: "No existe una lista de marcas",
          ok: false,
        });
  
      return res.status(201).json({
        msg: "Lista de marcas obtenida exitosamente",
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