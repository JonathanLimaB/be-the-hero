const express = require('express');

// Meus controllers
const OngController = require('./controllers/Ongcontroller');
const IncidentController = require('./controllers/Incidentcontroller');
const ProfileController = require('./controllers/Profilecontroller');
const SessionController = require('./controllers/Sessioncontroller');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
routes.delete('/ongs', OngController.delete); 

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete); // recebe um routeParams com o id da rota

module.exports = routes;