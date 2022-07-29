import mongoose from 'mongoose';

class DataBase {
    constructor() {
        this.mongoDataBase();
    }
    mongoDataBase() {
        var urlMongoose = "";
        urlMongoose = "mongodb://localhost/lucas"
        mongoose.connect(urlMongoose, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log("Conexão com MongoDB realizada com sucesso!");
        }).catch((erro) => {
            console.log("Conexão DB não realizada: " + erro);
        });
    }
}

export default new DataBase();