import Clientes from '../models/Clientes.js';
import * as Yup from 'yup';

class ClientesController {
    async index(req, res) {
        const { page = 1, limit = 60 } = req.query;
        var filter = { user: req.params.user, status: 'a' };
        await Clientes.paginate(filter, { sort: { nome_uf: 1 }, page, limit }).then((list) => {
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
        Clientes.findOne({ _id: req.params.id }, '-__v').then((type) => {
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

        const type = await Clientes.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: req.body,
                message: "Endereço não foi cadastrado com sucesso!",
            })

            return res.status(200).json({
                error: false,
                message: "Endereço cadastrado com sucesso!",
                data: type
            })
        });
    }

    async update(req, res) {
        const { _id, name } = req.body;

        const typeExist = await Clientes.findOne({ _id });

        if (!typeExist) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Fornecedor não encontrado."
            })
        }
        const dados = req.body;

        await Clientes.updateOne({ _id: dados._id }, dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 110,
                message: "Ocorreu um erro ao atualizar o Fornecedor. " + err
            })

            return res.json({
                error: false,
                message: "Fornecedor atualizado com sucesso!"
            })
        })


    }

    async delete(req, res) {
        var dados = {
            status: "d"
        }
        await Clientes.updateOne({ _id: req.params.id }, dados, (err) => {
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

export default new ClientesController();