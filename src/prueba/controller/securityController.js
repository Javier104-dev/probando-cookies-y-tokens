const { crearCookie } = require("../service/cookieService");
const { verificarToken } = require("../service/jwtService");

const cookieController = (req, res) => {
  const { usuario, apellido } = req.body;

  try {
    const cookie = crearCookie(usuario, apellido);
    res.cookie(cookie.name, cookie.value, cookie.options);
    res.json({ msg: `bienvenida ${usuario}` });

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
  res.send(`hola, estas validado: ${req.decoded.usuario}`);
};

module.exports = {
  cookieController,
  verificarController,
  prueba,
};
