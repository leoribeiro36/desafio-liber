const jwt = require('jsonwebtoken');
const secret = require ('../secret');

const verifyToken  = async (req, res) => {
    try {
        await jwt.verify(req.header('authorization'), secret.secret);
    } catch (error) {
        res.status(401).send({
            mensagem: `Sessão inválida`
        });
    }
}

module.exports = {
    verifyToken
};