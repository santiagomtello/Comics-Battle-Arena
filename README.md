# Comics-Battle-Arena


**Comics Battle Arena** es una aplicación que permite gestionar héroes de los universos Marvel y DC. Los usuarios pueden añadir, actualizar, eliminar y ver detalles de los héroes a través de una interfaz interactiva.

## Funcionalidades

- **Añadir**: Crear nuevos héroes con nombre, descripción, imagen y universo.
- **Actualizar**: Modificar la información de héroes existentes.
- **Eliminar**: Eliminar héroes de la base de datos.
- **Filtrar**: Filtrar héroes por universo (Marvel o DC).
- **Vista Modal**: Ver información detallada al hacer clic en una tarjeta de héroe.

## Requisitos

- **Node.js** (recomendado versión 14.x o superior)
- **Servidor API** (debe manejar solicitudes CRUD para los héroes)

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/comics-battle-arena.git
    cd comics-battle-arena
    ```

2. Asegúrate de tener un servidor API funcionando (ej. Express).

3. Abre `index.html` en tu navegador.

## Estructura del Proyecto

comics-battle-arena/ ├── index.html # Archivo principal ├── styles.css # Estilos CSS ├── script.js # Lógica de la aplicación └── README.md # Este archivo

markdown
Copiar
Editar

## API Endpoints

- **GET /heroes**: Obtener todos los héroes.
- **GET /heroes/:id**: Obtener un héroe por ID.
- **POST /heroes**: Añadir un nuevo héroe.
- **PUT /heroes/:id**: Actualizar un héroe.
- **DELETE /heroes/:id**: Eliminar un héroe.

## Contribuciones

1. Fork el repositorio.
2. Realiza tus cambios en una nueva rama.
3. Crea un pull request con tus modificaciones.

## Licencia

MIT
