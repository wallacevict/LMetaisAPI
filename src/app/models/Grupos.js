import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const Grupos = new Schema({
    nome: {
        type: String,
    },
    descricao: {
        type: String,
    },
    status: {
        type: String,
        default: 'a'
    }
}, {
    timestamps: true,
});

Grupos.plugin(mongoosePaginate);


export default mongoose.model('grupos', Grupos);