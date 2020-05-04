const express = require('express');
const router = express.Router();

// controller
const ChurchesController = require('./controllers/ChurchController')


// rotas
router.get('/', ChurchesController.list);
router.get('/nearested_churches', ChurchesController.getNearestedChurches);
router.post('/create_church', ChurchesController.create);


module.exports = router