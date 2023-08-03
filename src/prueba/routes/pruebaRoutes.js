const express = require("express");
const { cookieController, verificarController, prueba } = require("../controller/securityController");

const routes = express.Router();

routes.post("/login", cookieController);
routes.get("/protegido", verificarController, prueba);

module.exports = {
  routes,
};
