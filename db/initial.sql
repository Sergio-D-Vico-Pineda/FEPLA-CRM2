CREATE TABLE Instituto (
    id_instituto INT AUTO_INCREMENT PRIMARY KEY,
    -------------------
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    direccion VARCHAR(255),
    sitio_web VARCHAR(255),
    telefono VARCHAR(15),
    comentarios VARCHAR(255),
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Grupo (
    id_grupo INT AUTO_INCREMENT PRIMARY KEY,
    -------------------
    nombre VARCHAR(50) NOT NULL, -- E.g., "1° Bachiller", "2° ESO"
    descripcion VARCHAR(255),
    comentarios VARCHAR(255),
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -----------------------
    id_instituto INT NOT NULL,
    FOREIGN KEY (id_instituto) REFERENCES Instituto (id_instituto)
);

CREATE TABLE Curso (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    -------------------
    anio_academico VARCHAR(20) NOT NULL -- E.g., "2023/2024"
);

CREATE TABLE Alumno (
    id_alumno INT AUTO_INCREMENT PRIMARY KEY,
    -------------------
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
    activo BOOLEAN NOT NULL DEFAULT 1,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Inscripcion (
    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
    -------------------
    fecha_inscripcion DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_actualizacion TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -------------------
    id_alumno INT NOT NULL,
    id_grupo INT NOT NULL,
    id_curso INT NOT NULL,
    FOREIGN KEY (id_alumno) REFERENCES Alumno (id_alumno),
    FOREIGN KEY (id_grupo) REFERENCES Grupo (id_grupo),
    FOREIGN KEY (id_curso) REFERENCES Curso (id_curso)
);

CREATE TABLE Profesor (
    id_profesor INT AUTO_INCREMENT PRIMARY KEY,
    -------------------
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100),
    telefono VARCHAR(15),
    nif VARCHAR(10), -- 12346578Q
    nip VARCHAR(20), -- 12345670
    comentarios VARCHAR(255),
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Profesor_Instituto (
    id_profesor_instituto INT AUTO_INCREMENT PRIMARY KEY,
    -------------------
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -------------------
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
    -------------------
    usuario VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('Prof', 'Admin') NOT NULL DEFAULT 'Prof', -- Rol de usuario
    activo BOOLEAN NOT NULL DEFAULT 1, -- estado ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo'
    -------------------
    id_profesor INT UNIQUE, -- Relación uno a uno con Profesor
    FOREIGN KEY (id_profesor) REFERENCES Profesor (id_profesor)
);

CREATE TABLE Empresa (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    -------------------
    nombre VARCHAR(200) NOT NULL,
    nombre_empresarial VARCHAR(100),
    direccion VARCHAR(255),
    cif VARCHAR(15),
    sitio_web VARCHAR(255),
    sector VARCHAR(100),
    tecnologias VARCHAR(100),
    comentarios VARCHAR(255),
    activo BOOLEAN NOT NULL DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Practica (
    id_practica INT AUTO_INCREMENT PRIMARY KEY,
    -------------------
    fecha_inicio DATE,
    fecha_fin DATE,
    tipo_practica ENUM('Normal', 'Extraordinaria') NOT NULL DEFAULT 'Normal',
    estado ENUM(
        'Pendiente',
        'En curso',
        'Finalizada',
        'Cancelada'
    ) NOT NULL DEFAULT 'Pendiente',
    comentarios VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -------------------
    id_alumno INT NOT NULL,
    id_profesor INT NOT NULL,
    id_empresa INT NOT NULL,
    id_curso INT NOT NULL,
    FOREIGN KEY (id_alumno) REFERENCES Alumno (id_alumno),
    FOREIGN KEY (id_profesor) REFERENCES Profesor (id_profesor),
    FOREIGN KEY (id_empresa) REFERENCES Empresa (id_empresa),
    FOREIGN KEY (id_curso) REFERENCES Curso (id_curso),
    UNIQUE (id_alumno, id_curso) -- Un alumno solo puede tener una práctica por curso académico
);

CREATE TABLE Contacto (
    id_contacto INT AUTO_INCREMENT PRIMARY KEY,
    -------------------
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100),
    telefono VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    comentarios VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Contacto_Empresa (
    id_contacto_empresa INT AUTO_INCREMENT PRIMARY KEY,
    -------------------
    puesto VARCHAR(100),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -------------------
    id_contacto INT NOT NULL,
    id_empresa INT NOT NULL,
    FOREIGN KEY (id_contacto) REFERENCES Contacto (id_contacto),
    FOREIGN KEY (id_empresa) REFERENCES Empresa (id_empresa),
    UNIQUE (id_contacto, id_empresa) -- Un contacto no puede tener duplicadas sus relaciones con una empresa
);

CREATE TABLE Interaccion (
    id_interaccion INT AUTO_INCREMENT PRIMARY KEY,
    -------------------
    descripcion VARCHAR(255),
    tipo VARCHAR(50),
    estado ENUM(
        'Pendiente',
        'Cancelada',
        'Finalizada'
    ) NOT NULL DEFAULT 'Pendiente',
    comentarios VARCHAR(255),
    fecha_interaccion DATETIME,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -------------------
    id_empresa INT NOT NULL,
    id_contacto INT, -- Opcional
    FOREIGN KEY (id_empresa) REFERENCES Empresa (id_empresa),
    FOREIGN KEY (id_contacto) REFERENCES Contacto (id_contacto)
);

CREATE TABLE Registro (
    id_registro INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único de la acción
    -------------------
    -- accion VARCHAR(50) NOT NULL, -- Tipo de acción: 'Crear', 'Actualizar', 'Eliminar'
    entidad VARCHAR(50) NOT NULL, -- Tabla o entidad afectada
    id_entidad INT NOT NULL, -- Identificador de la entidad afectada
    descripcion VARCHAR(255) NOT NULL, -- Detalle adicional de la acción
    fecha_accion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora de la acción
    -------------------
    id_profesor INT NOT NULL, -- Referencia al profesor que realizó la acción
    FOREIGN KEY (id_profesor) REFERENCES Profesor (id_profesor) -- Clave foránea a Profesor
);
