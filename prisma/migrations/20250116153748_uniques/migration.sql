/*
  Warnings:

  - A unique constraint covering the columns `[nif]` on the table `Alumno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cif]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_instituto,nombre]` on the table `Grupo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nif]` on the table `Profesor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Grupo_nombre_key";

-- CreateIndex
CREATE UNIQUE INDEX "Alumno_nif_key" ON "Alumno"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cif_key" ON "Empresa"("cif");

-- CreateIndex
CREATE UNIQUE INDEX "Grupo_id_instituto_nombre_key" ON "Grupo"("id_instituto", "nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Profesor_nif_key" ON "Profesor"("nif");
