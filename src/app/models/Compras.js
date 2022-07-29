import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const Compras = new Schema({
    fornecedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fornecedores',
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

Compras.plugin(mongoosePaginate);


export default mongoose.model('compras', Compras);