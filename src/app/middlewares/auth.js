import jwt from 'jsonwebtoken';
import { config } from 'process';
import {promisify} from 'util';
import configAuth from '../../config/auth.js'
import User from '../models/User.js';



export default function(type = ''){
    return async(req, res, next) => {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                error: true,
                code: 130,
                message: "Token não encontrado"
            })
        }

        const [, token] = authHeader.split(' ');
        
        try{
            const decoded = await promisify(jwt.verify)(token, configAuth.secret);
            req.userId = decoded.id;        
            var user = await User.findOne({_id: req.userId}, '-__v');
            req.userFinal = user;
            if(user.type <= type || type === ''){            
                return next()
            }else{
                return res.status(401).json({
                    error: true,
                    code: 131,
                    message: "Permissão inválida!"
                }) 
            }
        }catch(err){
            return res.status(401).json({
                error: true,
                code: 130,
                message: "Token inválido!"
            })
        }

    }
}