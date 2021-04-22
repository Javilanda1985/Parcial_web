# Sistema simple de inicio de sesión y registro de usuario

Este es un sistema de autenticación y registro de usuario simple y funcional construido con Node, MongoDB y Redis.

MongoDB actúa como un base de datos principal y Redis se utiliza como un almacén de sesiones externo.

## Requisitos

Necesita tener los siguientes softwares instalados en su sistema.

* Node (v11.15.0 o superior)
* MongoDB
* Redis

## Como iniciarlo

Clona el repositorio y cambia a él usando la terminal.

Instale las dependencias del proyecto.

''
npm install
''

Cambie el archivo config.json de acuerdo con la configuración de su sistema.

Debe tener instalado MongoDB Compass para hacer la conexion y ver los datos.
''
{
   "mongodbURL": "mongodb://localhost/BASEDEDATOS",
   "redisHost": "localhost",
   "redisPort": 6379, (puerto por defecto)
   "sessionSecret": "algún-hash-secreto",
   "puerto": 3000,
   "env": "desarrollo"
}
''

Luego ejecute la aplicación usando el siguiente comando.

''
npm run test

''

Navegue con su navegador a ```localhost:3000``` para ver la aplicación. 