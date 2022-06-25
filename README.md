# Desafio - Concrete

API restful de exemplificação básica de login e busca de contas

## Instalação

Este código foi desenvolvido utilizando o a versão do node 10.15.1 e para executar ele basta utilizar, na raiz do projeto, os comandos:

```bash
npm install
npm start
```

## Uso

Para criar um usuário é necessário realizar um POST passando as informações do usuário.

Exemplo:

```
rota - http://localhost:3000/signup
{
"nome": "Teste",
"email": "teste@teste.com",
"senha":"senha",
"enderecos": [{
	"numero": "66666666",
	"estado": "Pernambuco",
    "rua": "Mario Almeida"
}]
}
```

Para logar será necessário realizar um POST passando o email e senha do usuário já existente no banco.

Exemplo

```
rota - http://localhost:3000/signin
{
"email": "joao@teste.com",
"senha":"senhajoao"
}
```

Para buscar um usuário é necessário realizar um GET passando o id do usuário como parâmetro e o token desse usuário no authorization.

Exemplo

```
rota - http://localhost:3000/findUser/1
```

Para atualizar um usuário é necessário realizar um PUT passando o id do usuário como parâmetro e o token desse usuário no authorization.

Exemplo

```
rota - http://localhost:3000/editUser/1
{
"nome": "joao3",
"email": "joao@teste.com"
}

```

Para deletar um usuário é necessário realizar um DELETE passando o id do usuário como parâmetro e o token desse usuário no authorization.

Exemplo

```
rota - http://localhost:3000/editUser/1

```

Para buscar um endereço é necessário realizar um GET passando o id do usuário como parâmetro e o token desse usuário no authorization.

Exemplo

```
rota - http://localhost:3000/findAddress/1
{
"authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

Para atualizar um endereço é necessário realizar um PUT passando o id do usuário como parâmetro e o token desse usuário no authorization.

Exemplo

```
rota - http://localhost:3000/editAddress/1
{
	"numero": "66666666",
	"estado": "Alagoas",
    "rua": "rua editada"
}
```

Para deletar um endereço é necessário realizar um DELETE passando o id do usuário como parâmetro e o token desse usuário no authorization.

Exemplo

```
rota - http://localhost:3000/deleteAddress/1
```