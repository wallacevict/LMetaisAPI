import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const Vendas = new Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientes',
    },
    funcionario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'funcionarios',
    },
    obs: {
        type: String,
    },
    itens: [{
        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'produtos'
        },
        quantidade: String,
        valor: Number
    }],
    status: {
        type: String,
        default: 'a'
    }
}, {
    timestamps: true,
});

Vendas.plugin(mongoosePaginate);


export default mongoose.model('vendas', Vendas);