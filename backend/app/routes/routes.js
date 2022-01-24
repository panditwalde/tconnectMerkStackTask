const express = require('express');
const routes = express.Router();
const controller = require("../controllers/Usercontroller");

routes.post("/login",  controller.login);
routes.post("/register", controller.register);


module.exports = routes;

  

 

