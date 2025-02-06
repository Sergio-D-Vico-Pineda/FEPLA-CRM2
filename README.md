# FEPLA-CRM

Hecho por Sergio D. Vico Pineda, Rafael Sánchez Martínez y Rubén Alemañ Arnau.

## Manual de instalación

### Requisitos

- Ejecutador de JavaScript (Node.js)
- Administrador de paquetes (npm o pnpm)
- Base datos SQLite _online_ (Turso) o _local_ (Puerto 3306?)

### Instrucciones

1. Clonar el repositorio (recomendado) o descargar el repositorio.

    ```bash
    git clone https://github.com/Scarpy/FEPLA-CRM2.git
    ```

2. Instalar paquetes.

    ```pnpm
    pnpm install
    ```

3. Crear el archivo `.env`. Si la opción es `turso`, se debe completar con:

    TURSO_DATABASE_URL=libsql://...  
    TURSO_AUTH_TOKEN=...  
    DATABASE_URL=file:./dev.db

4. Ejecutar el servidor.

    ```bash
    pnpm dev --host
    ```

5. Abrir la página web. Una posible url puede ser `http://localhost:4321`.
