import {response} from 'express'
import jwt from "jsonwebtoken";
import { secret_key } from "../config.js";

export const validarJWT= (req, res = response , next) => {
    const token = req.header('x-token')

    if ( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try{
        const {uid, name, idrol} = jwt.verify(
            token,
            secret_key
        )

        req.uid = uid
        req.name = name
        req.idrol = idrol

    }catch(error){
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'Ha expirado el token'
        })
    }
    next()
}