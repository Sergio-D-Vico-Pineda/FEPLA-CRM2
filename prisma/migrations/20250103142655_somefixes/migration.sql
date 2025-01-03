/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Alumno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre,email]` on the table `Contacto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Grupo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Instituto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Profesor` will be added. If there are existing duplicate values, this will fail.
  - Made the column `id_profesor` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Contacto_email_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'Prof',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "id_profesor" INTEGER NOT NULL,
    CONSTRAINT "Usuario_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "Profesor" ("id_profesor") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("activo", "contrasena", "email", "id_profesor", "id_usuario", "rol", "usuario") SELECT "activo", "contrasena", "email", "id_profesor", "id_usuario", "rol", "usuario" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_id_profesor_key" ON "Usuario"("id_profesor");
CREATE UNIQUE INDEX "Usuario_usuario_email_key" ON "Usuario"("usuario", "email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Alumno_nombre_key" ON "Alumno"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Contacto_nombre_email_key" ON "Contacto"("nombre", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_nombre_key" ON "Empresa"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Grupo_nombre_key" ON "Grupo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Instituto_nombre_key" ON "Instituto"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Profesor_nombre_key" ON "Profesor"("nombre");
