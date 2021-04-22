const mongoose = require("mongoose");
const nconf = require("nconf");
const chalk = require("chalk");

mongoose.connect(nconf.get("mongodbURL"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// validar la conexión MongoDB
const db = mongoose.connection;

// eventos

db.on("error", () => {
  console.log("Error de conexión de MongoDB");
  process.exit(0);
});

db.once("open", function (callback) {
  console.log(
    `${chalk.green("✓")} Conectado a ${chalk.green("MongoDB")} DB`
  );
});

module.exports = {
  mongoConnection: db,
};
