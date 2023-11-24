<h1 align='center'>Probando cookies y tokens</h1>

### Especificaciones
- Servidor: http://127.0.0.1:8080
- Versión: 1.0.0
- Autor: Javier Anibal Villca
- Repositorio GitHub: git+https://github.com/Javier104-dev/probando-cookies-y-tokens.git

### Tecnologías utilizadas
- **Node.js v18.16.0**: Plataforma de ejecución de JavaScript del lado del servidor.
- **Express**: Framework web para Node.js, simplifica la creación de aplicaciones web y APIs.
- **ESLint**: Herramienta de linting para mantener un código JavaScript/Node.js consistente y legible.
- **Dotenv**: Carga variables de entorno desde un archivo `.env` en la aplicación.
- **jsonwebtoken v9.0.1**: Librería que nos permite crear tokens JWT para la autenticación y el intercambio de información entre el servidor y el cliente.
- **cookie-parser v1.4.6**: Libreria para analizar y manejar las cookies que se envían desde el cliente hasta el servidor.

### Sobre el proyecto
Este es un proyecto para probar el envió de tokens al cliente mediante el uso de cookies.

Se utiliza un objeto común de JavaScript que contiene la información del cliente para poder hacer las pruebas, en él se encuentran los datos que almacenaremos en el token, como si es administrador, usuario y apellido del cliente.

``` js
{
  usuario: "Juan",
  apellido: "Perez",
  password: "123456789",
  admin: true,
}
```

Se usó la librería [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) para generar los tokens y [cookie-parser](https://www.npmjs.com/package/cookie-parser) para poder enviar el token usando cookies y poder leerlo en cada petición del cliente por medio del Header de cada request, con esto logramos que el cliente deba logearse una única vez y el servidor se encargara de habilitarle los recursos solicitados si tiene autorización, siempre y cuando la cookie o el tokens no se hayan vencido.

<h2 align='center'>Métodos HTTP y explicación</h2>

### Métodos utilizados en el proyecto
| Tipo | URI                             | Descripción                                                                                                                  |
| :--- | :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| POST | http://127.0.0.1:8080/login     | Login, aquí se genera el token y se envía al cliente mediante una cookie si logra ser autentificado con éxito                |
| GET  | http://127.0.0.1:8080/protegido | El cliente podrá acceder a el si posee una cookie con un tokens válido                                                       |
| GET  | http://127.0.0.1:8080/admin     | Verifica si el cliente autentificado tiene permisos de administrador, de lo contrario recibirá un mensaje de acceso denegado |

### Método POST
El servidor verifica los datos ingresados, si son válidos nos da la bienvenida, también genera el tokens con los datos necesarios (nombre, apellido, es admin) que serán usados en los demás endpoint y los envía en una cookie.

**Request**
- URI utilizada
  ```
  http://127.0.0.1:8080/login
  ```

**Response**
- Código **HTTP 200** *Ok*
  ``` json
  {
    "msg": "bienvenido nombre.usuario"
  }
  ```
- Código **HTTP 400**: *El nombre de usuario y/o contraseña son incorrectos.*

### Método GET - Específico
Endpoint de entrada a un recurso protegido, simulamos el acceso a una área de la aplicación donde solo se puede ingresar si el cliente fue validado con éxito.

Esta verificación se logra porque el usuario posee una cookie con su token personalizado en el encabezado de cada petición (request) que realice. De esta manera, el servidor puede analizar y comprobar si ese token es válido con nuestro servidor para otorgarle acceso, de lo contrario, solo recibirá un mensaje de rechazo.

**Request**
- URI utilizada
  ```
  http://127.0.0.1:8080/protegido
  ```
**Response**
- Código **HTTP 200** *Ok*
  ``` json
  {
    "msg": "hola, estas validado: nombre.usuario"
  }
  ```
- Código **HTTP 400**: *Token inexistente*

### Método GET - Específico
Simulación de un recurso protegido y con acceso exclusivo para administradores. El usuario aparte de estar validado con su token correspondiente, debe tener permiso de administrador.

Para saber si tiene permiso se obtienen los datos que contiene su token y se verifica la propiedad `admin: true`.
``` js
{
  usuario: "Juan",
  apellido: "Perez",
  admin: true,
}
```
**Request**
- URI utilizada
  ```
  http://127.0.0.1:8080/admin
  ```
**Response**
- Código **HTTP 200** *Ok*
  ``` json
  {
    "msg": "hola, administrador: nombre.usuario, tienes permiso"
  }
  ```
- Código **HTTP 400**: *Token inexistente*
- Código **HTTP 400**: *hola nombre.usuario, solo se permiten administradores*

<h2 align='center'>Instrucciones de instalación</h2>

### Requerimientos
- IDE - Visual Studio Code v1.84.2
- Git v2.43.0
- Node.js v20.9.0

### Preparando el ambiente
- Descargar o clonar el repositorio.
- Instalar las dependencias necesarias con el comando `npm install`.
- En la raíz del proyecto crear un archivo `.env`, copiar las variables de entorno que se encuentran en el archivo `.env.dist`.
- Correr el comando `npm start` para iniciar el servidor en modo desarrollo.
- Usar la URL base `http://127.0.0.1:8080` para interactuar con el servidor.

---

### Autor
| [<img src='https://avatars.githubusercontent.com/u/105408069?v=4' width=115><br><sub>Javier Anibal Villca</sub>](https://github.com/Javier104-dev) |
| :------------------------------------------------------------------------------------------------------------------------------------------------: |
