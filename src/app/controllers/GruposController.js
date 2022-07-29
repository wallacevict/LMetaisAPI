import Grupos from '../models/Grupos.js';
import * as Yup from 'yup';

class GruposController {
    async index(req, res) {
        const { page = 1, limit = 60 } = req.query;
        var filter = { user: req.params.user, status: 'a' };
        await Grupos.paginate(filter, { sort: { nome_uf: 1 }, page, limit }).then((list) => {
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
        Grupos.findOne({ _id: req.params.id }, '-__v').then((type) => {
            return res.json({
                error: false,
                type
            })
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Grupo não encontrado!"
            })
        })
    }

    async store(req, res) {
        var dados = req.body;

        const type = await Grupos.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: req.body,
                message: "Grupo não foi cadastrado com sucesso!",
            })

            return res.status(200).json({
                error: false,
                message: "Grupo cadastrado com sucesso!",
                data: type
            })
        });
    }

    async update(req, res) {
        const { _id, name } = req.body;

        const typeExist = await Grupos.findOne({ _id });

        if (!typeExist) {
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Grupo não encontrado."
            })
        }
        const dados = req.body;

        await Grupos.updateOne({ _id: dados._id }, dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 110,
                message: "Ocorreu um erro ao atualizar o Grupo. " + err
            })

            return res.json({
                error: false,
                message: "Grupo atualizado com sucesso!"
            })
        })


    }

    async delete(req, res) {
        var dados = {
            status: "d"
        }
        await Grupos.updateOne({ _id: req.params.id }, dados, (err) => {
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

export default new GruposController();