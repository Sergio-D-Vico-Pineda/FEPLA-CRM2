# FEPLA-CRM

Hecho por Sergio D. Vico Pineda, Rafael Sánchez Martínez y Rubén Alemañ Arnau.

## Manual de instalación

### Requisitos

- Ejecutador de JavaScript ([Node.js](https://nodejs.org/es))
- Administrador de paquetes (npm o [pnpm](https://pnpm.io/))
- Base datos SQLite _online_ (Turso) o _local_ (archivo .db)

### Instrucciones

0. Abrir una terminal o consola (cmd o powershell).

1. Clonar el repositorio (recomendado) o descargar el repositorio, y acceder a la carpeta.

    ```bash
    git clone https://github.com/Sergio-D-Vico-Pineda/FEPLA-CRM2.git
    ```

    ```bash
    cd FEPLA-CRM2
    ```

2. Instalar dependencias del proyecto.

    ```pnpm
    pnpm install
    ```

3. Crear o modificar el archivo `.env`. Si la opción es `Turso`, se debe completar con: (opcional, necesario si la opción es **online**)

    TURSO_DATABASE_URL=_libsql://example.turso.io_  
    TURSO_AUTH_TOKEN=_...InR5cCI6I..._

    - Si la opción es local:

    DATABASE_URL=file:_../prisma/dev.db_

    > _Se puede poner las 3 variables por si `Turso` falla._

4. Generar la base datos.

    ```pnpm
    pnpm prisma generate
    ```

5. Rellenar la base de datos con los datos necesarios.

    ```pnpm
    pnpm prisma db seed
    ```

6. Ejecutar el servidor.

    ```pnpm
    pnpm dev --host
    ```

7. Abrir la página web en el navegador a través una url que se mostrará con el anterior comando. Una posible url (desde el mismo ordenador) puede ser `http://localhost:4321`.
