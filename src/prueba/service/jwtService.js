const jwt = require("jsonwebtoken");

const generarToken = (usuario, apellido) => jwt.sign(
  { usuario, apellido },
  "95811db1cfcb463483956cb9777c5e4c",
  { expiresIn: "1h" },
);

const verificarToken = (cookie) => new Promise((resolve, reject) => {

  if (!cookie) reject(new Error("Token inexistente"));

  jwt.verify(cookie, "95811db1cfcb463483956cb9777c5e4c", (error, decoded) => {

    if (error) reject(new Error(error.message));

    resolve(decoded);
  });
});

module.exports = {
  generarToken,
  verificarToken,
};
