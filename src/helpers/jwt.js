import jwt from "jsonwebtoken";
import { secret_key } from "../config.js";

export const generarJWT = (uid, name, idrol) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, idrol };
    jwt.sign(
      payload,
      secret_key,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if(err){
            console.log(err)
            reject('No se pudo generar el token')
        }

        resolve( token )
      }
    );
  });
};
