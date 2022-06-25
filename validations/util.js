const jwt = require('jsonwebtoken');
const secret = require('../secret');
const User = require('../models').User;

function returnMessage(res, status, message) {
    console.log(message)

    return res.status(status).send({
        mensagem: message
    });
}

function checkEmpty(res, element, name) {
    try {
        if (element == undefined || element == "") {
            return {
                status: 400,
                mensagem: `O campo ${name} está vazio`
            };
        }
    } catch (error) {
        return res.status(500).send({
            mensagem: 'Erro inesperado'
        });
    }
}

const userHavePermission  = async (req, userId) => {
    auth = await jwt.decode(req.header('authorization'), secret.secret)
    var user = await User.findOne({ where: {id: userId, email: auth.data}});
    return user ? true : false
}


module.exports = {
    returnMessage,
    checkEmpty,
    userHavePermission
};