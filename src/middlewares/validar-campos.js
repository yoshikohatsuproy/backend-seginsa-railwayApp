import { response } from 'express'
import { validationResult } from 'express-validator'

export const validarCampos = (req, res = response, next) => {
    const  errors = validationResult(req)
    let mensaje = "" 
    
    errors['errors'].map( (err, index ) => (

        (index === 0) ? mensaje = err.msg : mensaje += ',' +  err.msg
       
    ))

    if (!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: mensaje
        })
    }

    next()
}

