import Compras from '../models/Compras.js';
import * as Yup from 'yup';

class ComprasController {
    async index(req, res) {
        const { page = 1, limit = 60 } = req.query;
        await Compras.find({ status: 'a' }).populate('fornecedor', 'nome').populate('itens.produto', 'nome').then((list) => {
            return res.json({
                error: false,
                list
            })
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Não foi possível executar a solicitação!"
            })
        })
    }

    async show(req, res) {
        Compras.findOne({ _id: req.params.id }, '-__v').then((type) => {
            return res.json({
                error: false,
                type
            })
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Tipo não encontrado!"
            })
        })
    }

    async store(req, res) {
        var dados = req.body;


        const type = await Compras.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: req.body,
                message: "Compra não foi cadastrada com sucesso!",
            })

            return res.status(200).json({
                error: false,
                message: "Compra cadastrado com sucesso!",
                data: type
            })
        });
    }

    async update(req, res) {
        const { _id, name } = req.body;

        const typeExist = await Compras.findOne({ _id });

        if (!typeExist) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Compras não encontrado."
            })
        }
        const dados = req.body;

        await Compras.updateOne({ _id: dados._id }, dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 110,
                message: "Ocorreu um erro ao atualizar o Compras. " + err
            })

            return res.json({
                error: false,
                message: "Compras atualizado com sucesso!"
            })
        })


    }

    async delete(req, res) {
        var dados = {
            status: "d"
        }
        await Compras.updateOne({ _id: req.params.id }, dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 110,
                message: "Ocorreu um erro ao atualizar. " + err
            })

            return res.json({
                error: false,
                message: "Atualizado com sucesso!"
            })
        })
    }
}

export default new ComprasController();