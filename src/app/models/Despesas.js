import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const Despesas = new Schema({
    valor: Number,
    grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'grupos',
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

Despesas.plugin(mongoosePaginate);


export default mongoose.model('despesas', Despesas);