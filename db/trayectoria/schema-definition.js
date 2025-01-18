const Instituto = defineTable({
  columns: {
    instituto_id: column.number({ primaryKey: true }),
    nombre: column.text({ notNull: true }),
    descripcion: column.text(),
    direccion: column.text(),
    sitio_web: column.text(),
    telefono: column.text(),
    comentarios: column.text(),
    fecha_creacion: column.date({ notNull: true }),
    fecha_actualizacion: column.date()
  }
});

const Grupo = defineTable({
  columns: {
    grupo_id: column.number({ primaryKey: true }),
    nombre: column.text({ notNull: true }),
    descripcion: column.text(),
    comentarios: column.text(),
    fecha_creacion: column.date({ notNull: true }),
    fecha_actualizacion: column.date(),
    instituto_id: column.number({ notNull: true, references: () => Instituto.instituto_id })
  }
});

const Curso = defineTable({
  columns: {
    curso_id: column.number({ primaryKey: true }),
    anio_academico: column.text({ notNull: true })
  }
});

const Alumno = defineTable({
  columns: {
    alumno_id: column.number({ primaryKey: true }),
    nombre: column.text({ notNull: true }),
    apellidos: column.text(),
    telefono: column.text(),
    direccion: column.text(),
    fecha_nacimiento: column.date(),
    email: column.text({ unique: true }),
    nif: column.text(),
    nia: column.text(),
    nuss: column.text(),
    comentarios: column.text(),
    activo: column.boolean({ notNull: true, default: true }),
    fecha_creacion: column.date({ notNull: true }),
    fecha_actualizacion: column.date()
  }
});

const Inscripcion = defineTable({
  columns: {
    inscripcion_id: column.number({ primaryKey: true }),
    fecha_inscripcion: column.date({ notNull: true }),
    fecha_actualizacion: column.date(),
    alumno_id: column.number({ notNull: true, references: () => Alumno.alumno_id }),
    grupo_id: column.number({ notNull: true, references: () => Grupo.grupo_id }),
    curso_id: column.number({ notNull: true, references: () => Curso.curso_id })
  }
});

const Profesor = defineTable({
  columns: {
    profesor_id: column.number({ primaryKey: true }),
    nombre: column.text({ notNull: true }),
    apellidos: column.text(),
    telefono: column.text(),
    nif: column.text(),
    nip: column.text(),
    comentarios: column.text(),
    fecha_creacion: column.date({ notNull: true }),
    fecha_actualizacion: column.date()
  }
});

const ProfesorInstituto = defineTable({
  columns: {
    profesor_instituto_id: column.number({ primaryKey: true }),
    fecha_creacion: column.date({ notNull: true }),
    fecha_actualizacion: column.date(),
    profesor_id: column.number({ notNull: true, references: () => Profesor.profesor_id }),
    instituto_id: column.number({ notNull: true, references: () => Instituto.instituto_id }),
    curso_id: column.number({ notNull: true, references: () => Curso.curso_id })
  },
  uniqueConstraints: {
    profesor_curso_unique: {
      columns: ['profesor_id', 'curso_id']
    }
  }
});

const Usuario = defineTable({
  columns: {
    usuario_id: column.number({ primaryKey: true }),
    usuario: column.text({ notNull: true, unique: true }),
    email: column.text({ notNull: true, unique: true }),
    contrasena: column.text({ notNull: true }),
    rol: column.enum(['Prof', 'Admin'], { notNull: true, default: 'Prof' }),
    activo: column.boolean({ notNull: true, default: true }),
    profesor_id: column.number({ unique: true, references: () => Profesor.profesor_id })
  }
});

const Empresa = defineTable({
  columns: {
    empresa_id: column.number({ primaryKey: true }),
    nombre: column.text({ notNull: true }),
    nombre_empresarial: column.text(),
    direccion: column.text(),
    cif: column.text(),
    sitio_web: column.text(),
    sector: column.text(),
    tecnologias: column.text(),
    comentarios: column.text(),
    activo: column.boolean({ notNull: true, default: true }),
    fecha_creacion: column.date(),
    fecha_actualizacion: column.date()
  }
});

const Practica = defineTable({
  columns: {
    practica_id: column.number({ primaryKey: true }),
    fecha_inicio: column.date(),
    fecha_fin: column.date(),
    tipo_practica: column.enum(['Normal', 'Extraordinaria'], { notNull: true, default: 'Normal' }),
    estado: column.enum(['Pendiente', 'En curso', 'Finalizada', 'Cancelada'], { notNull: true, default: 'Pendiente' }),
    comentarios: column.text(),
    fecha_creacion: column.date(),
    fecha_actualizacion: column.date(),
    alumno_id: column.number({ notNull: true, references: () => Alumno.alumno_id }),
    profesor_id: column.number({ notNull: true, references: () => Profesor.profesor_id }),
    empresa_id: column.number({ notNull: true, references: () => Empresa.empresa_id }),
    curso_id: column.number({ notNull: true, references: () => Curso.curso_id })
  },
  uniqueConstraints: {
    alumno_curso_unique: {
      columns: ['alumno_id', 'curso_id']
    }
  }
});

const Contacto = defineTable({
  columns: {
    contacto_id: column.number({ primaryKey: true }),
    nombre: column.text({ notNull: true }),
    apellidos: column.text(),
    telefono: column.text(),
    email: column.text({ unique: true }),
    comentarios: column.text(),
    fecha_creacion: column.date(),
    fecha_actualizacion: column.date()
  }
});

const ContactoEmpresa = defineTable({
  columns: {
    contacto_empresa_id: column.number({ primaryKey: true }),
    puesto: column.text(),
    fecha_creacion: column.date(),
    fecha_actualizacion: column.date(),
    contacto_id: column.number({ notNull: true, references: () => Contacto.contacto_id }),
    empresa_id: column.number({ notNull: true, references: () => Empresa.empresa_id })
  },
  uniqueConstraints: {
    contacto_empresa_unique: {
      columns: ['contacto_id', 'empresa_id']
    }
  }
});

const Interaccion = defineTable({
  columns: {
    interaccion_id: column.number({ primaryKey: true }),
    descripcion: column.text(),
    tipo: column.text(),
    estado: column.enum(['Pendiente', 'Cancelada', 'Finalizada'], { notNull: true, default: 'Pendiente' }),
    comentarios: column.text(),
    fecha_interaccion: column.date(),
    fecha_creacion: column.date(),
    fecha_actualizacion: column.date(),
    empresa_id: column.number({ notNull: true, references: () => Empresa.empresa_id }),
    contacto_id: column.number({ references: () => Contacto.contacto_id })
  }
});

const Registro = defineTable({
  columns: {
    registro_id: column.number({ primaryKey: true }),
    entidad: column.text({ notNull: true }),
    id_entidad: column.number({ notNull: true }),
    descripcion: column.text({ notNull: true }),
    fecha_accion: column.date({ notNull: true }),
    profesor_id: column.number({ notNull: true, references: () => Profesor.profesor_id })
  }
});