import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const Fornecedores = new Schema({
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
    obs: {
        type: String,
    },
    status: {
        type: String,
        default: 'a'
    }
}, {
    timestamps: true,
});

Fornecedores.plugin(mongoosePaginate);


export default mongoose.model('fornecedores', Fornecedores);