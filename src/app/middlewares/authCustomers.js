import jwt from 'jsonwebtoken';
import { config } from 'process';
import { promisify } from 'util';
import configAuth from '../../config/auth.js'
import Customer from '../models/Customer.js';



export default function(type = '') {
    return async(req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                error: true,
                code: 130,
                message: "Token não encontrado"
            })
        }

        const [, token] = authHeader.split(' ');

        try {
            const decoded = await promisify(jwt.verify)(token, configAuth.secret);
            req.userId = decoded.id;
            var user = await Customer.findOne({ _id: req.userId }, '-__v');
            req.userFinal = user;
            return next()
        } catch (err) {
            return res.status(401).json({
                error: true,
                code: 130,
                message: "Token inválido!"
            })
        }

    }
}