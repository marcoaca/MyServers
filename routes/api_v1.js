var express = require('express');
var apirouter = express.Router();
var bcrypt		= require('bcryptjs');
var expressJwt 	= require('express-jwt');
var jwt 		= require('jsonwebtoken');

apirouter.use('/api/v1', expressJwt({secret: '2280C0A70B1CA6B4C07768880DA1F9C55DA82ED6'}));

apirouter.post('/api/v1/login', function(req,res,next){
    console.log(req.body);
    if (!(req.body.email === 'john.doe' && req.body.password === 'foobar')) {
        res.status(401).send('Wrong user or password');
        return;
    }
    var profile = {
        email: req.body.email,
        id: 123
    };
    var token = jwt.sign(profile, '2280C0A70B1CA6B4C07768880DA1F9C55DA82ED6', { expiresIn: 60*60 });
    res.json({ token: token });
});

apirouter.get('/api/v1/clientes', function (req, res, next) {
    var clientes = [
        {clienteid: 1, nome: 'nome 1'},
        {clienteid: 2, nome: 'nome 2'},
        {clienteid: 3, nome: 'nome 3'},
        {clienteid: 4, nome: 'nome 4'}
    ];
    res.json(clientes);
});

apirouter.get('/api/v1/clientes/:clienteId/consultas', function (req, res, next) {
    var consultas = [
        {consultaid: 1, clienteid: 1, texto: 'texto consulta 1'},
        {consultaid: 2, clienteid: 1, texto: 'texto consulta 2'},
        {consultaid: 3, clienteid: 2, texto: 'texto consulta 3'},
        {consultaid: 4, clienteid: 2, texto: 'texto consulta 4'},
        {consultaid: 5, clienteid: 3, texto: 'texto consulta 5'},
        {consultaid: 6, clienteid: 4, texto: 'texto consulta 6'},
        {consultaid: 7, clienteid: 3, texto: 'texto consulta 7'},
        {consultaid: 8, clienteid: 4, texto: 'texto consulta 8'},
        {consultaid: 9, clienteid: 5, texto: 'texto consulta 9'},
        {consultaid: 10, clienteid: 2, texto: 'texto consulta 10'},
        {consultaid: 11, clienteid: 3, texto: 'texto consulta 11'},
        {consultaid: 12, clienteid: 3, texto: 'texto consulta 12'},
        {consultaid: 13, clienteid: 4, texto: 'texto consulta 13'},
        {consultaid: 14, clienteid: 5, texto: 'texto consulta 14'},
        {consultaid: 15, clienteid: 5, texto: 'texto consulta 15'},
    ];

    param = req.params['clienteId'];

    var temp = consultas.filter(function (elem) {
        return (elem.clienteid == param );
    });

    res.json(temp);
});

module.exports = apirouter;