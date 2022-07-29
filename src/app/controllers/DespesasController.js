import Despesas from '../models/Despesas.js';
import * as Yup from 'yup';

class DespesasController {
    async index(req, res) {
        const { page = 1, limit = 60 } = req.query;
        await Despesas.find({ status: 'a' }).populate('grupo', 'nome').then((list) => {
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
        Despesas.findOne({ _id: req.params.id }, '-__v').then((type) => {
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


        const type = await Despesas.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: req.body,
                message: "Despesa não foi cadastrada com sucesso!",
            })

            return res.status(200).json({
                error: false,
                message: "Despesa cadastrado com sucesso!",
                data: type
            })
        });
    }

    async update(req, res) {
        const { _id, name } = req.body;

        const typeExist = await Despesas.findOne({ _id });

        if (!typeExist) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Despesas não encontrado."
            })
        }
        const dados = req.body;

        await Despesas.updateOne({ _id: dados._id }, dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 110,
                message: "Ocorreu um erro ao atualizar o Despesas. " + err
            })

            return res.json({
                error: false,
                message: "Despesas atualizado com sucesso!"
            })
        })


    }

    async delete(req, res) {
        var dados = {
            status: "d"
        }
        await Despesas.updateOne({ _id: req.params.id }, dados, (err) => {
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

export default new DespesasController();