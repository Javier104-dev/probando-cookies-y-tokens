const { prueba } = require("../model/pruebaModel");
const { generarToken } = require("./jwtService");

const crearCookie = (usuario, apellido, password) => {
  if (prueba.usuario === usuario && prueba.apellido === apellido && prueba.password === password) {
    return {
      name: "cookie_con_token",
      value: generarToken(prueba.usuario, prueba.apellido, prueba.admin),
      options: {
        maxAge: 60 * 60 * 1000, // Duración de una hora
        httpOnly: true, // Protocolo http
        // secure: true, // Conexión segura https
        sameSite: true, // No se enviará en peticiones cross-site
      },
    };
  }

  throw new Error("El nombre de usuario y/o contraseña son incorrectas.");
};

module.exports = {
  crearCookie,
};
