import express from 'express';
import routes from './routes.js';
import cors from 'cors';
import path from 'path'
import { fileURLToPath } from 'url';
import './config/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());

        this.app.use(
            '/files',
            express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
        )

        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
            res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization, Info-Header");
            this.app.use(cors({
                origin: true,
                credentials: true
            }));
            next();
        })
    }

    routes(){
        this.app.use(routes);
    }
}

export default new App().app;