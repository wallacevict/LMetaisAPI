import Vendas from '../models/Vendas.js';
import * as Yup from 'yup';

class VendasController {
    async index(req, res) {
        const { page = 1, limit = 60 } = req.query;
        await Vendas.find({ status: 'a' }).populate('cliente', 'nome').populate('itens.produto', 'nome').then((list) => {
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
        Vendas.findOne({ _id: req.params.id }, '-__v').then((type) => {
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

        const type = await Vendas.create(dados, (err) => {
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

        const typeExist = await Vendas.findOne({ _id });

        if (!typeExist) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Vendas não encontrado."
            })
        }
        const dados = req.body;

        await Vendas.updateOne({ _id: dados._id }, dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 110,
                message: "Ocorreu um erro ao atualizar o Vendas. " + err
            })

            return res.json({
                error: false,
                message: "Vendas atualizado com sucesso!"
            })
        })


    }

    async delete(req, res) {
        var dados = {
            status: "d"
        }
        await Vendas.updateOne({ _id: req.params.id }, dados, (err) => {
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

export default new VendasController();