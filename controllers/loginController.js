const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret');
const User = require('../models').User;
const Address = require('../models').Address;
const {isValidLogin} = require('../helpers/loginHelper');
const { forEach } = require('p-iteration');

function generateToken(req) {
    var token = jwt.sign({
        data: req.body.email
    }, secret.secret, { expiresIn: 60 * 30 });
    return token;
}

function encrypt(element) {
    var salt = bcrypt.genSaltSync(11);
    var hash = bcrypt.hashSync(element, salt);
    return hash;
}

const signUp = async (req, res) => {
    try {
        let encryptPassword = encrypt(req.body.senha);
        let token = generateToken(req);
        let addresses = req.body.enderecos;
        var user = await User.create({
            name: req.body.nome,
            email: req.body.email,
            password: encryptPassword,
            lastLogin: new Date()
        });
        await forEach(addresses, async element => {
            await Address.create({
                number: element.numero,
                street: element.rua,
                state: element.estado,
                userId: user.id
            });
        });
        return res.status(201).send({token: token});
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            mensagem: 'Erro inesperado'
        });
    }
};

const signIn = async (req, res) => {
    try {
        var token = generateToken(req);
        return res.status(200).send({token: token});
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            mensagem: 'Erro inesperado'
        });
    }
};

module.exports = {
    signIn,
    signUp
};