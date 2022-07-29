import User from '../models/User.js';



export default function(req){   
    return async(req, res, next) => {
        const user = await User.findOne({_id: req.userId})     
        if(user.type === 1 || user.type === 2)  return next();   
        if(user.local.findIndex(x => x.codigo_ibge === parseInt(req.headers['info-header'])) === -1){
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Permissão inválida."
            })
        }else{
            return next();
        }

    }
}