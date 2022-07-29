import Funcionarios from '../models/Funcionarios.js';
import * as Yup from 'yup';

class FuncionariosController {
    async index(req, res) {
        const { page = 1, limit = 60 } = req.query;
        var filter = { user: req.params.user, status: 'a' };
        await Funcionarios.paginate(filter, { sort: { nome_uf: 1 }, page, limit }).then((list) => {
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
        Funcionarios.findOne({ login: req.params.login, senha: req.params.senha }, '-__v').then((type) => {
            return res.json({
                error: false,
                type
            })
        }).catch((err) => {
            return res.status(200).json({
                error: true,
                code: 107,
                message: "Usuario não encontrado!"
            })
        })
    }

    async store(req, res) {
        var dados = req.body;

        const type = await Funcionarios.create(dados, (err) => {
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

        const typeExist = await Funcionarios.findOne({ _id });

        if (!typeExist) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Fornecedor não encontrado."
            })
        }
        const dados = req.body;

        await Funcionarios.updateOne({ _id: dados._id }, dados, (err) => {
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
        await Funcionarios.updateOne({ _id: req.params.id }, dados, (err) => {
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

export default new FuncionariosController();