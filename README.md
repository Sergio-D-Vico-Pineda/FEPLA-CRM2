# FEPLA-CRM

Hecho por Sergio D. Vico Pineda, Rafael Sánchez Martínez y Rubén Alemañ Arnau.

## Manual de instalación

### Requisitos

- Ejecutador de JavaScript (Node.js)
- Administrador de paquetes (npm o pnpm)
- Base datos SQLite _online_ (Turso) o _local_ (archivo .db)

### Instrucciones

1. Clonar el repositorio (recomendado) o descargar el repositorio.

    ```bash
    git clone https://github.com/Scarpy/FEPLA-CRM2.git
    ```

2. Instalar paquetes.

    ```pnpm
    pnpm install
    ```

3. Crear el archivo `.env`. Si la opción es `Turso`, se debe completar con:

    TURSO_DATABASE_URL=_libsql://example.turso.io_  
    TURSO_AUTH_TOKEN=_...InR5cCI6I..._

    - Si la opción es local:

    DATABASE_URL=file:_./dev.db_

    > _Se puede poner las 3 variables por si `Turso` falla._

4. Generar la base datos.

    ```pnpm
    pnpm prisma generate
    ```

5. Ejecutar el servidor.

    ```pnpm
    pnpm dev --host
    ```

6. Abrir la página web en el navegador a través una url que se mostrará con el anterior comando. Una posible url (desde el mismo ordenador) puede ser `http://localhost:4321`.
