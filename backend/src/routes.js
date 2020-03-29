const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

// Meus controllers
const OngController = require('./controllers/Ongcontroller');
const IncidentController = require('./controllers/Incidentcontroller');
const ProfileController = require('./controllers/Profilecontroller');
const SessionController = require('./controllers/Sessioncontroller');

const routes = express.Router();

// controle de sessão
routes.post('/sessions', SessionController.create);

// Controle de busca, cadastro e deleção de Ongs 
routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        watsapp: Joi.string().required().min(9).max(12),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })    
}), OngController.create);

// Não criei deleção pois esse foi apenas um caso de teste particular.
routes.delete('/ongs', OngController.delete); 

// verificação de todos os casos cadastrados para determinada ong
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

// Controle de Busca, inclusão e deleção de casos.
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);
routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title:  Joi.string().required(),
        description:  Joi.string().required(),
        value: Joi.number().required(),
    })
}) ,IncidentController.create);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete); // recebe um routeParams com o id da rota

module.exports = routes;