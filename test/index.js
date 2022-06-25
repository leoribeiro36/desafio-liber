const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const User = require('../models').User;
const should = chai.should();

chai.use(chaiHttp);


// ==> Test signup
describe('Teste singUp', () => {

    it('Deve criar um novo usuário', (done) => {
        let body = {
            "nome": "Teste1",
            "email": "teste1@teste.com",
            "senha": "senha",
            "enderecos": [{
                "numero": "44444",
                "estado": "Pará",
                "rua": "rua do"
                }]
        };

        chai.request(server)
            .post('/signup')
            .send(body)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});

