require("dotenv").config();
// const crypto = require("crypto");

// const identificadorUnicoUniversal = crypto.randomUUID();
// const uuIdFormateado = identificadorUnicoUniversal.replaceAll("-", "");
// console.log(uuIdFormateado);
// "95811db1cfcb463483956cb9777c5e4c"

module.exports = {
  HOST: process.env.SERVER_HOST,
  PORT: process.env.SERVER_PORT,
};
