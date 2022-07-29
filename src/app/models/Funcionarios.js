import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const Funcionarios = new Schema({
    nome: {
        type: String,
    },
    endereco: {
        endereco: String,
        numero: String,
        bairro: String,
        cep: String,
        cidade: String,
    },
    documento: {
        type: String,
    },
    perms: [],
    obs: {
        type: String,
    },
    login: {
        type: String,
    },
    senha: {
        type: String,
    },
    status: {
        type: String,
        default: 'a'
    }
}, {
    timestamps: true,
});

Funcionarios.plugin(mongoosePaginate);


export default mongoose.model('funcionarios', Funcionarios);