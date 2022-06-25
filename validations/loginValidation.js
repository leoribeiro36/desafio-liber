const util = require('./util');
const jwt = require('jsonwebtoken');
const secret = require('../secret');
const User = require('../models').User;
const bcrypt = require('bcrypt');

function checkEmptyAddress(address) {
    var message;
    address.forEach(element => {
        if (element.numero === undefined || element.numero === "") {
            message = {
                status: 400,
                mensagem: `O número de um dos enderecos está vazio`
            };
        }
        if (element.rua === undefined || element.rua === "") {
            message = {
                status: 400,
                mensagem: `A rua de um dos enderecos está vazio`
            };
        }
        if (element.estado === undefined || element.estado === "") {
            message = {
                status: 400,
                mensagem: `O estado de um dos enderecos está vazio`
            };
        }
    });
    return message;
}

async function checkEmail(req) {
    var user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
        return {
            status: 400,
            mensagem: `E-mail já existente`
        };
    }
}

async function checkIfExists(req, message) {
    var user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
        return {
            status: 401,
            mensagem: message
        };
    }
}

async function verifyPassword(req) {
    var user = await User.findOne({ where: { email: req.body.email } });
    const match = await bcrypt.compare(req.body.senha, user.password);
    if (!match) {
        return {
            status: 401,
            mensagem: `Usuário e/ou senha inválidos`
        };
    }
}

const signUp = async (req, res, next) => {
    try {
        var check = util.checkEmpty(res, req.body.nome, 'nome');
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        check = util.checkEmpty(res, req.body.email, 'email');
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        check = util.checkEmpty(res, req.body.senha, 'senha');
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        check = checkEmptyAddress(req.body.enderecos);
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        check = await checkEmail(req);
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        next();
    } catch (error) {
        return res.status(500).send({
            mensagem: 'Erro inesperado'
        });
    }
};

const signIn = async (req, res, next) => {
    try {
        var check = util.checkEmpty(res, req.body.email, 'email');
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        check = util.checkEmpty(res, req.body.senha, 'senha');
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        check = await checkIfExists(req, `Usuário e/ou senha inválidos`);
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        check = await verifyPassword(req);
        if (check) {
            return util.returnMessage(res, check.status, check.mensagem);
        }
        next();
    } catch (error) {
        return res.status(500).send({
            mensagem: 'Erro inesperado'
        });
    }
};

const verifyToken  = async (req, res, next) => {
    try {
        await jwt.verify(req.header('authorization'), secret.secret);
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).send({
                mensagem: `Token expirado, realize o login novamente`
            });
        } else {
            res.status(401).send({
                mensagem: `Token inválido, realize o login novamente`
            });
        }
    }
}

module.exports = {
    signIn,
    signUp,
    verifyToken
};