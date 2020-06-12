# Ferreteria - React/AspCore

**Code Challenge v .1**

    Criterios de aceptación:
    - Visualizar, en una grilla, todos los productos de la ferretería (código, descripción, categoría, precio, stock)
    - Buscar cualquier producto por nombre o código
    - Editar los datos de un producto
    - Eliminar los datos de un producto
    - Agregar un nuevo producto al inventario
    Stack:
    - Frontend: ReactJS / Asp Net Core MVC
    - Backend: Rest API - net core 3.1
    - RDBMS: MySQL
    - Lenguaje de programación de backend: C#

## Solución

Se desarolló las 2 aplicaciones en base a lo establecido.
Siga las instrucciones para ejecutar el proyecto.

## BD

Para importar la Bd puede ejecutar ferreteria_rodrigo.sql o SQL.sql.

## Asp Core Project

Para ejecutar este proyecto. Necesitamos tener instalado el SDK 3.1 de Asp Core.

Nos digirimos a la carpeta del proyecto

> cd BackendFerreteria

Y ejecutamos

> dotnet run

El proyecto se ejecuta por default en el puerto 5000 y apuntando a una DB en localhost (Esto se puede modificar en el archivo Startup.cs).

## React App

Para ejecutar este proyecto. Necesitamos tener instalado Node, de preferencia con NPM v5.2+.

> cd frontend-ferreteria

Para descargar las dependecias del proyecto ejecutamos 

> npm install 

Si utilizas yarn

> yarn

Finalmente 

> yarn start || npm start

El proyecto se ejecuta por defecto en el puerto 3000 y apunta al proyecto backend en el puerto 5000.

Esto se puede modificar en el archivo src/components/request/Request.js

Agradezco la posibilidad de participar en el desafío y acepto cualquier recomendación en busca de feedback.