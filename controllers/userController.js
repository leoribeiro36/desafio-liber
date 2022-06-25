const User = require('../models').User;
const util = require('../validations/util');

const findUser = async (req, res) => {
    try {
        var user = await User.findOne({
            attributes: ['email', 'lastLogin', 'createdAt', 'updatedAt'],
            where: {id: parseInt(req.params.id)}
        });

        if (!user) return res.status(404).send({mensagem: `Usuário não encontrado`});
        if (!await util.userHavePermission(req, parseInt(req.params.id)))  {
            return res.status(401).send({mensagem: `Usuário sem permissão para o valor solicitado`});
        }

        return res.status(200).send(user);
    } catch (error) {
        res.status(500).send("Erro inesperado");
    }
};

const editUser = async (req, res) => {
    try {
        if (!await util.userHavePermission(req, parseInt(req.params.id)))  {
            return res.status(401).send({mensagem: `Usuário sem permissão para o valor solicitado`});
        }

        let user = await User.update({
            name: req.body.nome,
            email: req.body.email,
        },
        {
            where: {
                id: req.params.id
            }
        });

        if (user[0] == 0) {
            return res.status(400).send({
                mensagem: `Usuário não existe`
            });
        }

        return res.status(200).send({mensagem: "Usuário atualizado"});
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        if (!await util.userHavePermission(req, parseInt(req.params.id)))  {
            return res.status(401).send({mensagem: `Usuário sem permissão para o valor solicitado`});
        }

        let user = await User.destroy({
            where: {
                email: req.params.id
            }
        });

        if (!user) {
            return res.status(400).send({
                mensagem: `Usuário não existe`
            });
        }

        return res.status(200).send({mensagem: "Usuário deletado"});
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    findUser,
    editUser,
    deleteUser
};