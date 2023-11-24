const express = require("express");
const cookieParser = require("cookie-parser");
const { HOST, PORT } = require("./config/config");
const { routes } = require("./prueba/routes/pruebaRoutes");

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));

server.use(routes);

// const verificar = (req, res, next) => {
//   const { cookies } = req;

//   if (Object.keys(cookies).length === 0) return res.send("sin token");

//   jwt.verify(cookies.tokens_con_cookie, "95811db1cfcb463483956cb9777c5e4c", (error, decoded) => {

//     if (error) return res.status(401).send(error.message);

//     req.decoded = decoded;
//     next();
//   });
// };

// server.get("/login/prot", verificar, (req, res) => {
//   res.send(`hola, estas validado: ${req.decoded.usuario}`);
// });

// server.get("*", (req, res) => {
//   res.send("url no existente");
// });

server.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`http://${HOST}:${PORT}`);
});
