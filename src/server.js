// const crypto = require("crypto");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));

const prueba = {
  usuario: "javier",
  apellido: "villca",
};

// const identificadorUnicoUniversal = crypto.randomUUID();
// const uuIdFormateado = identificadorUnicoUniversal.replaceAll("-", "");
// console.log(uuIdFormateado);
// "95811db1cfcb463483956cb9777c5e4c"

const generalToken = (parametro, para2) => jwt.sign({ parametro, para2 }, "95811db1cfcb463483956cb9777c5e4c", { expiresIn: "10h" });

const verificar = (req, res, next) => {
  const { cookies } = req;

  if (Object.keys(cookies).length === 0) return res.send("sin token");

  jwt.verify(cookies.tokens_con_cookie, "95811db1cfcb463483956cb9777c5e4c", (error, decoded) => {
    if (error) return res.status(401).send(error.message);
    req.decoded = decoded;
    next();
  });
};

server.post("/login", (req, res) => {
  if (req.body.usuario === prueba.usuario) {
    res.cookie("tokens_con_cookie", generalToken(prueba.usuario, prueba.apellido), {
      maxAge: 60 * 60 * 1000, // Duración de una hora
      httpOnly: true, // Protocolo http
      // secure: true, // Conexión segura https
      sameSite: true, // No se enviará en peticiones cross-site
    });

    return res.send("bienvenido");
  }

  return res.send("user invalido");
});

server.get("/login/prot", verificar, (req, res) => {
  res.send(`hola, estas validado: ${req.decoded.parametro}`);
});

server.get("*", (req, res) => {
  res.send("url no existente");
});

server.listen("8080", "127.0.0.1", () => {
  // eslint-disable-next-line no-console
  console.log("http://127.0.0.1:8080/cookie");
});
