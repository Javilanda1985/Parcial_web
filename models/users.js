const bcrypt = require("bcrypt");
const { mongoConnection } = require("./connection");
/**
 * @addUser
 */

function addUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      // Compruebe si el usuario no existe
      let checkUserData = await checkIfUserExists({ email: userData.email });
      if (checkUserData.data && checkUserData.data.length > 0) {
        // el usuario ya existe, enviar respuesta
        return resolve({
          error: true,
          message: "El usuario ya existe con estas credenciales. Por favor Iniciar sesión",
          data: [],
        });
      }
      // GENERAR UN HASH DE UNA CONTRASEÑA
      let passwordHash = await bcrypt.hash(userData.password, 15);
      userData.password = passwordHash;

      // aGREGAR UN NUEVO USUARIO
      mongoConnection
        .collection("users")
        .insertOne(userData, async (err, results) => {
          if (err) {
            console.log(err);
            throw new Error(err);
          }
          //return data
          resolve({
            error: false,
            data: results.ops[0],
          });
        });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * @verifyUser
 * @param {*} userData
 */

function verifyUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      let userDatafromDb = await checkIfUserExists({ email: userData.email });
      if (userDatafromDb.data && userDatafromDb.data.length > 0) {
        // user already exists, verify the password
        let passwordVerification = await bcrypt.compare(
          userData.password,
          userDatafromDb.data[0].password
        );
        if (!passwordVerification) {
          // password mismatch
          return resolve({
            error: true,
            message: "COntraseña o correo invalido",
            data: [],
          });
        }
        // password verified
        return resolve({ error: false, data: userDatafromDb.data[0] });
      } else {
        return resolve({
          error: true,
          message:
            "No existe ningún usuario con estas credenciales. Por favor cree una nueva cuenta..",
          data: [],
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

/**
 * @checkIfUserExists
 */

function checkIfUserExists(userData) {
  return new Promise((resolve, reject) => {
    try {
      // check if user exists
      mongoConnection
        .collection("users")
        .find({ email: userData.email })
        .toArray((err, results) => {
          if (err) {
            console.log(err);
            throw new Error(err);
          }
          resolve({ error: false, data: results });
        });
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  addUser: addUser,
  verifyUser: verifyUser,
};
