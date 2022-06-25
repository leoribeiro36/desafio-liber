const Address = require('../models').Address;
const util = require('../validations/util');

const findAddress = async (req, res) => {
    try {
        let address = await Address.findOne({
            attributes: ['street', 'state', 'number', 'userId','createdAt', 'updatedAt'],
            where: {id: req.params.id}
        });

        if (!address) return res.status(404).send({mensagem: `Endereço não encontrado`});

        if (!await util.userHavePermission(req, address.userId))  return res.status(401).send({
            mensagem: `Usuário sem permissão para o valor solicitado`});

        return res.status(200).send(address);
    } catch (error) {
        console.log(error)
        res.status(500).send("Erro inesperado");
    }
};

const editAddress = async (req, res) => {
    try {
        let address = await Address.findOne({
            attributes: ['street', 'state', 'number', 'userId','createdAt', 'updatedAt'],
            where: {id: req.params.id}
        });

        if (!address) return res.status(404).send({mensagem: `Endereço não encontrado`});

        if (!await util.userHavePermission(req, address.userId))  return res.status(401).send({
            mensagem: `Usuário sem permissão para o valor solicitado`});

        let updatedAddress = await Address.update({
            numero: req.body.numero,
            estado: req.body.estado,
            rua: req.body.rua,
            userId: address.userId
        },
        {
            where: {
                id: req.params.id
            }
        });

        if (updatedAddress[0] == 0) {
            return res.status(400).send({
                mensagem: `Endereço não existe`
            });
        }

        return res.status(200).send({mensagem: "Endereço atualizado"});
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};

const deleteAddress = async (req, res) => {
    try {
        let address = await Address.findOne({
            attributes: ['street', 'state', 'number', 'userId','createdAt', 'updatedAt'],
            where: {id: req.params.id}
        });

        if (!address) return res.status(404).send({mensagem: `Endereço não encontrado`});

        if (!await util.userHavePermission(req, address.userId))  return res.status(401).send({
            mensagem: `Usuário sem permissão para o valor solicitado`});

        let deletedAddress = await Address.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!deletedAddress) {
            return res.status(400).send({
                mensagem: `Endereço não existe`
            });
        }

        return res.status(200).send({mensagem: "Endereço deletado"});
    } catch (error) {
console.log(error)

        res.status(500).send(error);
    }
};

module.exports = {
    findAddress,
    editAddress,
    deleteAddress
};