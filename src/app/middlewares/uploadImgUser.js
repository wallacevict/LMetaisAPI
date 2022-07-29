import multer from 'multer';
import crypto from 'crypto';
import {extname} from 'path';
import path from 'path'
import config from '../../config/config.js';

export default{
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            var folder = "";
            if(req.query.type == 2){
                folder = "photos";
            }else if(req.query.type == 3){
                folder = "videos";
            }else{
                folder = "users";
            }
            if(!config.dev){               
                cb(null, path.resolve(__dirname, "..", "..", "..", "tmp", "uploads", folder))
            }else{
                cb(null, 'tmp/uploads/'+folder)
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
        if(req.query.type == 3){
            if(file.mimetype == "video/mp4" || file.mimetype == "video/wmv"){
                return cb(null, true);
            }else{
                return cb(null, false);
            }
        }else{
            if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
                return cb(null, true);
            }else{
                return cb(null, false);
            }
        }
    }
}