import multer from 'multer';
import crypto from 'crypto';
import {extname} from 'path';
import path from 'path'
import config from '../../config/config.js';

export default{
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let folder;
            if(file.fieldname === 'image'){
                folder = "logos";
            }else{
                folder = "banners";
            }
            if(!config.dev){               
                cb(null, './tmp/uploads/restaurants/' + folder)
            }else{
                cb(null, 'tmp/uploads/restaurants/' + folder)
            }
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, res) => {
                if(err) return cb(err);
                cb(null, res.toString('hex') + extname(file.originalname))
            })            
        }
    }),
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
            return cb(null, true);
        }else{
            return cb(null, false);
        }
    }
}