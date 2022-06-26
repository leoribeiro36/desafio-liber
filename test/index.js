const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const User = require('../models').User;
const should = chai.should();

chai.use(chaiHttp);


// ==> Test signup
describe('Teste singUp', () => {
    it('Deve criar um novo usuário', (done) => {
        const body = {
            "nome": "Teste1",
            "email": "teste1@teste.com",
            "senha": "senha",
            "enderecos": [{
                "numero": "9999999",
                "rua": "99",
                "estado": "teste"
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

    it('Deve informar que já existe um usuário com esse email', (done) => {
        const body = {
            "nome": "Teste2",
            "email": "teste1@teste.com",
            "senha": "senha",
            "enderecos": [{
                "numero": "9999999",
                "rua": "99",
                "estado": "teste"
            }]
        };

        chai.request(server)
            .post('/signup')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve informar que o nome não foi informado', (done) => {
        const body = {
            "email": "teste3@teste.com",
            "senha": "senha",
            "enderecos": [{
                "numero": "9999999",
                "rua": "99",
                "estado": "teste"
            }]
        };

        chai.request(server)
            .post('/signup')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve informar que o email não foi informado', (done) => {
        const body = {
            "nome": "Teste4",
            "senha": "senha",
            "enderecos": [{
                "numero": "9999999",
                "rua": "99",
                "estado": "teste"
            }]
        };

        chai.request(server)
            .post('/signup')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve informar que a senha não foi informada', (done) => {
        const body = {
            "nome": "Teste5",
            "email": "teste5@teste.com",
            "enderecos": [{
                "numero": "9999999",
                "rua": "99",
                "estado": "teste"
            }]
        };

        chai.request(server)
            .post('/signup')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve informar que o numero de um dos enderecos não foi informado', (done) => {
        const body = {
            "nome": "Teste6",
            "email": "teste6@teste.com",
            "senha": "senha",
            "enderecos": [{
                "rua": "99",
                "estado": "teste"
            }]
        };

        chai.request(server)
            .post('/signup')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve informar que o estado de um dos enderecos não foi informado', (done) => {
        const body = {
            "nome": "Teste7",
            "email": "teste7@teste.com",
            "senha": "senha",
            "enderecos": [{
                "numero": "9999999",
                "rua": "99"
            }]
        };

        chai.request(server)
            .post('/signup')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve informar que a rua de um dos enderecos não foi informado', (done) => {
        const body = {
            "nome": "Teste7",
            "email": "teste7@teste.com",
            "senha": "senha",
            "enderecos": [{
                "numero": "9999999",
                "estado": "teste"
            }]
        };

        chai.request(server)
            .post('/signup')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

describe('Teste singIn', () => {
    it('Deve logar', (done) => {
        const body = {
            "email": "teste1@teste.com",
            "senha": "senha"
        };

        chai.request(server)
            .post('/signin')
            .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Deve informar que a senha está inválida', (done) => {
        const body = {
            "email": "teste1@teste.com",
            "senha": "senhaerrada"
        };

        chai.request(server)
            .post('/signin')
            .send(body)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it('Deve informar que o email está inválido', (done) => {
        const body = {
            "email": "testeerrado@teste.com",
            "senha": "senha"
        };

        chai.request(server)
            .post('/signin')
            .send(body)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it('Deve informar que o email está vazio', (done) => {
        const body = {
            "senha": "senha"
        };

        chai.request(server)
            .post('/signin')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Deve informar que a senha está vazia', (done) => {
        const body = {
            "email": "teste@teste.com"
        };

        chai.request(server)
            .post('/signin')
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});
