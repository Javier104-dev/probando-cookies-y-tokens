const { crearCookie } = require("../service/cookieService");
const { verificarToken } = require("../service/jwtService");

const cookieController = (req, res) => {
  const { usuario, apellido, password } = req.body;

  try {
    const cookie = crearCookie(usuario, apellido, password);
    res.cookie(cookie.name, cookie.value, cookie.options);
    res.json({ msg: `bienvenido ${usuario}` });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verificarController = async (req, res, next) => {
  const cookies = Object.values(req.cookies);

  try {
    const decoded = await verificarToken(cookies[0]);
    req.decoded = decoded;
    next();

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const prueba = async (req, res) => {
  res.json({ msg: `hola, estas validado: ${req.decoded.usuario}` });
};

const pruebaAdmi = async (req, res) => {
  if (req.decoded.admin) {
    res.json({ msg: `hola, administrador: ${req.decoded.usuario}, tienes permiso` });
    return;
  }
  res.send(`hola ${req.decoded.usuario}, solo se permiten administradores`);
};

module.exports = {
  cookieController,
  verificarController,
  prueba,
  pruebaAdmi,
};
