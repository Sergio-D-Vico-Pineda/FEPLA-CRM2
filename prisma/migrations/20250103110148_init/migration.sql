-- CreateTable
CREATE TABLE "Instituto" (
    "id_instituto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "direccion" TEXT,
    "sitio_web" TEXT,
    "telefono" TEXT,
    "comentarios" TEXT,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" DATETIME
);

-- CreateTable
CREATE TABLE "Grupo" (
    "id_grupo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "comentarios" TEXT,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" DATETIME,
    "id_instituto" INTEGER NOT NULL,
    CONSTRAINT "Grupo_id_instituto_fkey" FOREIGN KEY ("id_instituto") REFERENCES "Instituto" ("id_instituto") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Curso" (
    "id_curso" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "anio_academico" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Alumno" (
    "id_alumno" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT,
    "telefono" TEXT,
    "direccion" TEXT,
    "fecha_nacimiento" DATETIME,
    "email" TEXT,
    "nif" TEXT,
    "nia" TEXT,
    "nuss" TEXT,
    "comentarios" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" DATETIME
);

-- CreateTable
CREATE TABLE "Inscripcion" (
    "id_inscripcion" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha_inscripcion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" DATETIME,
    "id_alumno" INTEGER NOT NULL,
    "id_grupo" INTEGER NOT NULL,
    "id_curso" INTEGER NOT NULL,
    CONSTRAINT "Inscripcion_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "Alumno" ("id_alumno") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inscripcion_id_grupo_fkey" FOREIGN KEY ("id_grupo") REFERENCES "Grupo" ("id_grupo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inscripcion_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Curso" ("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Profesor" (
    "id_profesor" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT,
    "telefono" TEXT,
    "nif" TEXT,
    "nip" TEXT,
    "comentarios" TEXT,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" DATETIME
);

-- CreateTable
CREATE TABLE "Profesor_Instituto" (
    "id_profesor_instituto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" DATETIME,
    "id_profesor" INTEGER NOT NULL,
    "id_instituto" INTEGER NOT NULL,
    "id_curso" INTEGER NOT NULL,
    CONSTRAINT "Profesor_Instituto_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "Profesor" ("id_profesor") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Profesor_Instituto_id_instituto_fkey" FOREIGN KEY ("id_instituto") REFERENCES "Instituto" ("id_instituto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Profesor_Instituto_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Curso" ("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'Prof',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "id_profesor" INTEGER,
    CONSTRAINT "Usuario_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "Profesor" ("id_profesor") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id_empresa" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "nombre_empresarial" TEXT,
    "direccion" TEXT,
    "cif" TEXT,
    "sitio_web" TEXT,
    "sector" TEXT,
    "tecnologias" TEXT,
    "comentarios" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" DATETIME
);

-- CreateTable
CREATE TABLE "Practica" (
    "id_practica" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha_inicio" DATETIME,
    "fecha_fin" DATETIME,
    "tipo_practica" TEXT NOT NULL DEFAULT 'Normal',
    "estado" TEXT NOT NULL DEFAULT 'Pendiente',
    "comentarios" TEXT,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" DATETIME,
    "id_alumno" INTEGER NOT NULL,
    "id_profesor" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "id_curso" INTEGER NOT NULL,
    CONSTRAINT "Practica_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "Alumno" ("id_alumno") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Practica_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "Profesor" ("id_profesor") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Practica_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa" ("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Practica_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "Curso" ("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Contacto" (
    "id_contacto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT,
    "telefono" TEXT,
    "email" TEXT,
    "comentarios" TEXT,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" DATETIME
);

-- CreateTable
CREATE TABLE "Contacto_Empresa" (
    "id_contacto_empresa" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "puesto" TEXT,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" DATETIME,
    "id_contacto" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    CONSTRAINT "Contacto_Empresa_id_contacto_fkey" FOREIGN KEY ("id_contacto") REFERENCES "Contacto" ("id_contacto") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contacto_Empresa_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa" ("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Interaccion" (
    "id_interaccion" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT,
    "tipo" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'Pendiente',
    "comentarios" TEXT,
    "fecha_interaccion" DATETIME,
    "fecha_creacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" DATETIME,
    "id_empresa" INTEGER NOT NULL,
    "id_contacto" INTEGER,
    CONSTRAINT "Interaccion_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa" ("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Interaccion_id_contacto_fkey" FOREIGN KEY ("id_contacto") REFERENCES "Contacto" ("id_contacto") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Registro" (
    "id_registro" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entidad" TEXT NOT NULL,
    "id_entidad" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_accion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_profesor" INTEGER NOT NULL,
    CONSTRAINT "Registro_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "Profesor" ("id_profesor") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Alumno_email_key" ON "Alumno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profesor_Instituto_id_profesor_id_curso_key" ON "Profesor_Instituto"("id_profesor", "id_curso");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_id_profesor_key" ON "Usuario"("id_profesor");

-- CreateIndex
CREATE UNIQUE INDEX "Practica_id_alumno_id_curso_key" ON "Practica"("id_alumno", "id_curso");

-- CreateIndex
CREATE UNIQUE INDEX "Contacto_email_key" ON "Contacto"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contacto_Empresa_id_contacto_id_empresa_key" ON "Contacto_Empresa"("id_contacto", "id_empresa");
