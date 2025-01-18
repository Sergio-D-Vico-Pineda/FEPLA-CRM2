-- Create ENUM types first
CREATE TYPE usuario_rol AS ENUM ('Prof', 'Admin');
CREATE TYPE practica_tipo AS ENUM ('Normal', 'Extraordinaria');
CREATE TYPE practica_estado AS ENUM ('Pendiente', 'En curso', 'Finalizada', 'Cancelada');
CREATE TYPE interaccion_estado AS ENUM ('Pendiente', 'Cancelada', 'Finalizada');

-- Create tables
CREATE TABLE Instituto (
    id_instituto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    direccion VARCHAR(255),
    sitio_web VARCHAR(255),
    telefono VARCHAR(15),
    comentarios VARCHAR(255),
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Grupo (
    id_grupo INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL, -- E.g., "1° Bachiller", "2° ESO"
    descripcion VARCHAR(255),
    comentarios VARCHAR(255),
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_instituto INTEGER NOT NULL,
    FOREIGN KEY (id_instituto) REFERENCES Instituto (id_instituto)
);

CREATE TABLE Curso (
    id_curso INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    anio_academico VARCHAR(20) NOT NULL -- E.g., "2023/2024"
);

CREATE TABLE Alumno (
    id_alumno INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100),
    telefono VARCHAR(15),
    direccion VARCHAR(255),
    fecha_nacimiento DATE,
    email VARCHAR(100) UNIQUE,
    nif VARCHAR(10), -- 12346578Q
    nia VARCHAR(9), -- 12345670
    nuss VARCHAR(20),
    comentarios VARCHAR(255),
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Inscripcion (
    id_inscripcion INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fecha_inscripcion DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_alumno INTEGER NOT NULL,
    id_grupo INTEGER NOT NULL,
    id_curso INTEGER NOT NULL,
    FOREIGN KEY (id_alumno) REFERENCES Alumno (id_alumno),
    FOREIGN KEY (id_grupo) REFERENCES Grupo (id_grupo),
    FOREIGN KEY (id_curso) REFERENCES Curso (id_curso)
);

CREATE TABLE Profesor (
    id_profesor INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100),
    telefono VARCHAR(15),
    nif VARCHAR(10), -- 12346578Q
    nip VARCHAR(20), -- 12345670
    comentarios VARCHAR(255),
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Profesor_Instituto (
    id_profesor_instituto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_profesor INTEGER NOT NULL,
    id_instituto INTEGER NOT NULL,
    id_curso INTEGER NOT NULL,
    FOREIGN KEY (id_profesor) REFERENCES Profesor (id_profesor),
    FOREIGN KEY (id_instituto) REFERENCES Instituto (id_instituto),
    FOREIGN KEY (id_curso) REFERENCES Curso (id_curso),
    UNIQUE (id_profesor, id_curso) -- Garantiza que un profesor esté en un solo instituto por curso
);

CREATE TABLE Usuario (
    id_usuario INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol usuario_rol NOT NULL DEFAULT 'Prof',
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    id_profesor INTEGER UNIQUE,
    FOREIGN KEY (id_profesor) REFERENCES Profesor (id_profesor)
);

CREATE TABLE Empresa (
    id_empresa INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    nombre_empresarial VARCHAR(100),
    direccion VARCHAR(255),
    cif VARCHAR(15),
    sitio_web VARCHAR(255),
    sector VARCHAR(100),
    tecnologias VARCHAR(100),
    comentarios VARCHAR(255),
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Practica (
    id_practica INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fecha_inicio DATE,
    fecha_fin DATE,
    tipo_practica practica_tipo NOT NULL DEFAULT 'Normal',
    estado practica_estado NOT NULL DEFAULT 'Pendiente',
    comentarios VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_alumno INTEGER NOT NULL,
    id_profesor INTEGER NOT NULL,
    id_empresa INTEGER NOT NULL,
    id_curso INTEGER NOT NULL,
    FOREIGN KEY (id_alumno) REFERENCES Alumno (id_alumno),
    FOREIGN KEY (id_profesor) REFERENCES Profesor (id_profesor),
    FOREIGN KEY (id_empresa) REFERENCES Empresa (id_empresa),
    FOREIGN KEY (id_curso) REFERENCES Curso (id_curso),
    UNIQUE (id_alumno, id_curso) -- Un alumno solo puede tener una práctica por curso académico
);

CREATE TABLE Contacto (
    id_contacto INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100),
    telefono VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    comentarios VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Contacto_Empresa (
    id_contacto_empresa INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    puesto VARCHAR(100),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_contacto INTEGER NOT NULL,
    id_empresa INTEGER NOT NULL,
    FOREIGN KEY (id_contacto) REFERENCES Contacto (id_contacto),
    FOREIGN KEY (id_empresa) REFERENCES Empresa (id_empresa),
    UNIQUE (id_contacto, id_empresa) -- Un contacto no puede tener duplicadas sus relaciones con una empresa
);

CREATE TABLE Interaccion (
    id_interaccion INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    descripcion VARCHAR(255),
    tipo VARCHAR(50),
    estado interaccion_estado NOT NULL DEFAULT 'Pendiente',
    comentarios VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_empresa INTEGER NOT NULL,
    id_contacto INTEGER, -- Opcional
    FOREIGN KEY (id_empresa) REFERENCES Empresa (id_empresa),
    FOREIGN KEY (id_contacto) REFERENCES Contacto (id_contacto)
);