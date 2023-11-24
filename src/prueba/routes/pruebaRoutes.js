const express = require("express");
const {
  cookieController,
  verificarController,
  prueba,
  pruebaAdmi,
} = require("../controller/securityController");

const routes = express.Router();

routes.post("/login", cookieController);
routes.get("/protegido", verificarController, prueba);
routes.get("/admin", verificarController, pruebaAdmi);

module.exports = {
  routes,
};
