const { prueba } = require("../model/pruebaModel");
const { generarToken } = require("./jwtService");

const crearCookie = (usuario, apellido) => {
  if (prueba.usuario === usuario && prueba.apellido === apellido) {
    return {
      name: "cookie_con_token",
      value: generarToken(usuario, apellido),
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
