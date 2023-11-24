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

Se utiliza un objeto común de JavaScript que contiene la información del cliente para poder hacer las pruebas, en él se encuentra la información que almacenaremos en el tokens, como si es administrador, usuario y apellido del cliente.

``` json
{
  "usuario": "javier",
  "apellido": "villca",
  "password": "123456789",
  "admin": true,
}
```

Se usó la librería [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) para generar los tokens y [cookie-parser](https://www.npmjs.com/package/cookie-parser) para poder enviar el token y poder leerlo en cada petición del cliente por medio del Header de cada request, con esto logramos que el cliente deba logearse una única vez y el servidor se encargara de habilitarle los recursos necesarios si tiene autorización siempre y cuando la cookie o el tokens no se hayan vencido.

<h2 align='center'>Métodos HTTP y explicación</h2>

### Métodos utilizados en el proyecto
| Tipo | URI                             | Descripción                                                                                                                  |
| :--- | :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| POST | http://127.0.0.1:8080/login     | Login, aquí se genera el token y se envía al cliente mediante una cookie si logra ser autentificado con éxito                          |
| GET  | http://127.0.0.1:8080/protegido | El cliente podrá acceder a el si posee una cookie con un tokens válido                                                       |
| GET  | http://127.0.0.1:8080/admin     | Verifica si el cliente autentificado tiene permisos de administrador, de lo contrario recibirá un mensaje de acceso denegado |
