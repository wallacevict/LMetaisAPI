import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const Produtos = new Schema({
    nome: {
        type: String,
    },
    descricao: {
        type: String,
    },
    grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'grupos',
    },
    precos: {
        compra: String,
        venda: String,
    },
    tipo: {
        type: String,
    },
    estoque: {
        type: String,
    },
    status: {
        type: String,
        default: 'a'
    }
}, {
    timestamps: true,
});

Produtos.plugin(mongoosePaginate);


export default mongoose.model('produtos', Produtos);