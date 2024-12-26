CREATE TABLE Instituto (
    id_instituto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),
    ciudad VARCHAR(100)
);

CREATE TABLE Grupo (
    id_grupo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL, -- E.g., "1° Bachiller", "2° ESO"
    id_instituto INT NOT NULL,
    FOREIGN KEY (id_instituto) REFERENCES Instituto (id_instituto)
);

CREATE TABLE Curso (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    anio_academico VARCHAR(20) NOT NULL -- E.g., "2023/2024"
);

CREATE TABLE Alumno (
    id_alumno INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE
);

CREATE TABLE Inscripcion (
    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
    id_alumno INT NOT NULL,
    id_grupo INT NOT NULL,
    id_curso INT NOT NULL,
    fecha_inscripcion DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (id_alumno) REFERENCES Alumno (id_alumno),
    FOREIGN KEY (id_grupo) REFERENCES Grupo (id_grupo),
    FOREIGN KEY (id_curso) REFERENCES Curso (id_curso)
);

CREATE TABLE Profesor (
    id_profesor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100)
);

CREATE TABLE Profesor_Instituto (
    id_profesor_instituto INT AUTO_INCREMENT PRIMARY KEY,
    id_profesor INT NOT NULL,
    id_instituto INT NOT NULL,
    id_curso INT NOT NULL,
    FOREIGN KEY (id_profesor) REFERENCES Profesor (id_profesor),
    FOREIGN KEY (id_instituto) REFERENCES Instituto (id_instituto),
    FOREIGN KEY (id_curso) REFERENCES Curso (id_curso),
    UNIQUE (id_profesor, id_curso) -- Garantiza que un profesor esté en un solo instituto por curso
);

CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Contraseña cifrada
    rol ENUM('Prof', 'Admin') NOT NULL DEFAULT 'Prof', -- Rol de usuario
    activo BOOLEAN NOT NULL DEFAULT 1,
    -- estado ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
    id_profesor INT UNIQUE, -- Relación uno a uno con Profesor
    FOREIGN KEY (id_profesor) REFERENCES Profesor(id_profesor)
);
