/* import { defineDb, defineTable, column } from 'astro:db';

const Instituto = defineTable({
  columns: {
    instituto_id: column.number({ primaryKey: true }),
    nombre: column.text(),
    descripcion: column.text({ optional: true }),
    direccion: column.text({ optional: true }),
    sitio_web: column.text({ optional: true }),
    telefono: column.text({ optional: true }),
    comentarios: column.text({ optional: true }),
    fecha_creacion: column.date({ default: new Date() }),
    fecha_actualizacion: column.date({ optional: true })
  }
});

const Grupo = defineTable({
  columns: {
    grupo_id: column.number({ primaryKey: true }),
    nombre: column.text(),
    descripcion: column.text({ optional: true }),
    comentarios: column.text({ optional: true }),
    fecha_creacion: column.date({ default: new Date() }),
    fecha_actualizacion: column.date({ optional: true }),
    // FKs
    instituto_id: column.number({ references: () => Instituto.columns.instituto_id })
  }
});

const Curso = defineTable({
  columns: {
    curso_id: column.number({ primaryKey: true }),
    anio_academico: column.text()
  }
});

const Alumno = defineTable({
  columns: {
    alumno_id: column.number({ primaryKey: true }),
    nombre: column.text(),
    apellidos: column.text({ optional: true }),
    telefono: column.text({ optional: true }),
    direccion: column.text({ optional: true }),
    fecha_nacimiento: column.date({ optional: true }),
    email: column.text({ unique: true }),
    nif: column.text({ optional: true }),
    nia: column.text({ optional: true }),
    nuss: column.text({ optional: true }),
    comentarios: column.text({ optional: true }),
    activo: column.boolean({ default: true }),
    fecha_creacion: column.date({ default: new Date() }),
    fecha_actualizacion: column.date({ optional: true })
  }
});

const Inscripcion = defineTable({
  columns: {
    inscripcion_id: column.number({ primaryKey: true }),
    fecha_inscripcion: column.date(),
    fecha_actualizacion: column.date({ optional: true }),
    // FKs
    alumno_id: column.number(),
    grupo_id: column.number(),
    curso_id: column.number()
  },
  foreignKeys: [
    {
      columns: ["alumno_id", "grupo_id", "curso_id"],
      references: () => [Alumno.columns.alumno_id, Grupo.columns.grupo_id, Curso.columns.curso_id]
    }
  ]
});

const Profesor = defineTable({
  columns: {
    profesor_id: column.number({ primaryKey: true }),
    nombre: column.text(),
    apellidos: column.text({ optional: true }),
    telefono: column.text({ optional: true }),
    nif: column.text({ optional: true }),
    nip: column.text({ optional: true }),
    comentarios: column.text({ optional: true }),
    fecha_creacion: column.date({ default: new Date() }),
    fecha_actualizacion: column.date({ optional: true })
  }
});

const ProfesorInstituto = defineTable({
  columns: {
    profesor_instituto_id: column.number({ primaryKey: true }),
    fecha_creacion: column.date({ default: new Date() }),
    fecha_actualizacion: column.date({ optional: true }),
    // FKs
    profesor_id: column.number({ unique: true }),
    instituto_id: column.number(),
    curso_id: column.number({ unique: true })
  },
  foreignKeys: [
    {
      columns: ["profesor_id", "instituto_id", "curso_id"],
      references: () => [Profesor.columns.profesor_id, Instituto.columns.instituto_id, Curso.columns.curso_id]
    }
  ]
});

const Usuario = defineTable({
  columns: {
    usuario_id: column.number({ primaryKey: true }),
    usuario: column.text({ unique: true }),
    email: column.text({ unique: true }),
    contrasena: column.text(),
    rol: column.text({ default: 'Profesor', }), // "Profesor", "Administrador"
    activo: column.boolean({ default: true }),
    // FKs
    profesor_id: column.number({ unique: true, references: () => Profesor.columns.profesor_id })
  }
});

const Empresa = defineTable({
  columns: {
    empresa_id: column.number({ primaryKey: true }),
    nombre: column.text(),
    nombre_empresarial: column.text({ optional: true }),
    direccion: column.text({ optional: true }),
    cif: column.text({ optional: true }),
    sitio_web: column.text({ optional: true }),
    sector: column.text({ optional: true }),
    tecnologias: column.text({ optional: true }),
    comentarios: column.text({ optional: true }),
    activo: column.boolean({ default: true }),
    fecha_creacion: column.date({ default: new Date() }),
    fecha_actualizacion: column.date({ optional: true })
  }
});

const Practica = defineTable({
  columns: {
    practica_id: column.number({ primaryKey: true }),
    fecha_inicio: column.date({ optional: true }),
    fecha_fin: column.date({ optional: true }),
    tipo_practica: column.text({ default: 'Normal' }), // "Normal", "Extraordinaria"
    estado: column.text({ default: 'Pendiente' }), // "Pendiente", "En curso", "Finalizada", "Cancelada"
    comentarios: column.text({ optional: true }),
    fecha_creacion: column.date({ default: new Date() }),
    fecha_actualizacion: column.date({ optional: true }),
    // FKs
    alumno_id: column.number({ unique: true }),
    profesor_id: column.number(),
    empresa_id: column.number(),
    curso_id: column.number({ unique: true })
  },
  foreignKeys: [
    {
      columns: ["alumno_id", "profesor_id", "empresa_id", "curso_id"],
      references: () => [Alumno.columns.alumno_id, Profesor.columns.profesor_id, Empresa.columns.empresa_id, Curso.columns.curso_id]
    }
  ]
});

const Contacto = defineTable({
  columns: {
    contacto_id: column.number({ primaryKey: true }),
    nombre: column.text(),
    apellidos: column.text({ optional: true }),
    telefono: column.text({ optional: true }),
    email: column.text({ unique: true }),
    comentarios: column.text({ optional: true }),
    fecha_creacion: column.date({ default: new Date() }),
    fecha_actualizacion: column.date({ optional: true })
  }
});

const ContactoEmpresa = defineTable({
  columns: {
    contacto_empresa_id: column.number({ primaryKey: true }),
    puesto: column.text({ optional: true }),
    fecha_creacion: column.date({ default: new Date() }),
    fecha_actualizacion: column.date({ optional: true }),
    // FKs
    contacto_id: column.number({ unique: true }),
    empresa_id: column.number({ unique: true })
  },
  foreignKeys: [
    {
      columns: ["contacto_id", "empresa_id"],
      references: () => [Contacto.columns.contacto_id, Empresa.columns.empresa_id]
    }
  ]
});

const Interaccion = defineTable({
  columns: {
    interaccion_id: column.number({ primaryKey: true }),
    descripcion: column.text({ optional: true }),
    tipo: column.text({ optional: true }),
    estado: column.text({ default: 'Pendiente' }), // "Pendiente", "Cancelada", "Finalizada"
    comentarios: column.text({ optional: true }),
    fecha_interaccion: column.date({ optional: true }),
    fecha_creacion: column.date({ default: new Date() }),
    fecha_actualizacion: column.date({ optional: true }),
    // FKs
    empresa_id: column.number(),
    contacto_id: column.number({ optional: true })
  },
  foreignKeys: [
    {
      columns: ["empresa_id", "contacto_id"],
      references: () => [Empresa.columns.empresa_id, Contacto.columns.contacto_id]
    }
  ]
});

const Registro = defineTable({
  columns: {
    registro_id: column.number({ primaryKey: true }),
    entidad: column.text(),
    id_entidad: column.number(),
    descripcion: column.text(),
    fecha_accion: column.date({ default: new Date() }),
    // FKs
    profesor_id: column.number({ references: () => Profesor.columns.profesor_id })
  }
});

export default defineDb({
  tables: {
    Instituto,
    Grupo,
    Curso,
    Alumno,
    Inscripcion,
    Profesor,
    ProfesorInstituto,
    Usuario,
    Empresa,
    Practica,
    Contacto,
    ContactoEmpresa,
    Interaccion,
    Registro
  }
}); */