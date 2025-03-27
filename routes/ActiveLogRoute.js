const express = require('express');
const ActiveLogRoute = express.Router();
const ActiveLogController = require('../controllers/ActiveLogController');


ActiveLogRoute.get('/ActiveLogShow', ActiveLogController.ActiveLogController);
ActiveLogRoute.get("/log/delete/:id", ActiveLogController.ActiveLogDelete);

module.exports = ActiveLogRoute;