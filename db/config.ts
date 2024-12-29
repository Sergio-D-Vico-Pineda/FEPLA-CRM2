import { defineDb, defineTable, column } from 'astro:db';

const Instituto = defineTable({
  columns: {
    instituto_id: column.number({ primaryKey: true }),
    nombre: column.text({ optional: false }),
    descripcion: column.text(),
    direccion: column.text(),
    sitio_web: column.text(),
    telefono: column.text(),
    comentarios: column.text(),
    fecha_creacion: column.date({ optional: false }),
    fecha_actualizacion: column.date()
  }
});

const Grupo = defineTable({
  columns: {
    grupo_id: column.number({ primaryKey: true }),
    nombre: column.text({ optional: false }),
    descripcion: column.text(),
    comentarios: column.text(),
    fecha_creacion: column.date({ optional: false }),
    fecha_actualizacion: column.date(),
    instituto_id: column.number({ optional: false, references: () => Instituto.columns.instituto_id })
  }
});

const Curso = defineTable({
  columns: {
    curso_id: column.number({ primaryKey: true }),
    anio_academico: column.text({ optional: false })
  }
});

const Alumno = defineTable({
  columns: {
    alumno_id: column.number({ primaryKey: true }),
    nombre: column.text({ optional: false }),
    apellidos: column.text(),
    telefono: column.text(),
    direccion: column.text(),
    fecha_nacimiento: column.date(),
    email: column.text({ unique: true }),
    nif: column.text(),
    nia: column.text(),
    nuss: column.text(),
    comentarios: column.text(),
    activo: column.boolean({ optional: false, default: true }),
    fecha_creacion: column.date({ optional: false }),
    fecha_actualizacion: column.date()
  }
});

const Inscripcion = defineTable({
  columns: {
    inscripcion_id: column.number({ primaryKey: true }),
    fecha_inscripcion: column.date({ optional: false }),
    fecha_actualizacion: column.date(),
    alumno_id: column.number({ optional: false, references: () => Alumno.columns.alumno_id }),
    grupo_id: column.number({ optional: false, references: () => Grupo.columns.grupo_id }),
    curso_id: column.number({ optional: false, references: () => Curso.columns.curso_id })
  }
});

const Profesor = defineTable({
  columns: {
    profesor_id: column.number({ primaryKey: true }),
    nombre: column.text({ optional: false }),
    apellidos: column.text(),
    telefono: column.text(),
    nif: column.text(),
    nip: column.text(),
    comentarios: column.text(),
    fecha_creacion: column.date({ optional: false }),
    fecha_actualizacion: column.date()
  }
});

const ProfesorInstituto = defineTable({
  columns: {
    profesor_instituto_id: column.number({ primaryKey: true }),
    fecha_creacion: column.date({ optional: false }),
    fecha_actualizacion: column.date(),
    profesor_id: column.number({ optional: false, references: () => Profesor.columns.profesor_id }),
    instituto_id: column.number({ optional: false, references: () => Instituto.columns.instituto_id }),
    curso_id: column.number({ optional: false, references: () => Curso.columns.curso_id })
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
    usuario: column.text({ optional: false, unique: true }),
    email: column.text({ optional: false, unique: true }),
    contrasena: column.text({ optional: false }),
    rol: column.enum(['Prof', 'Admin'], { optional: false, default: 'Prof' }),
    activo: column.boolean({ optional: false, default: true }),
    profesor_id: column.number({ unique: true, references: () => Profesor.columns.profesor_id })
  }
});

const Empresa = defineTable({
  columns: {
    empresa_id: column.number({ primaryKey: true }),
    nombre: column.text({ optional: false }),
    nombre_empresarial: column.text(),
    direccion: column.text(),
    cif: column.text(),
    sitio_web: column.text(),
    sector: column.text(),
    tecnologias: column.text(),
    comentarios: column.text(),
    activo: column.boolean({ optional: false, default: true }),
    fecha_creacion: column.date(),
    fecha_actualizacion: column.date()
  }
});

const Practica = defineTable({
  columns: {
    practica_id: column.number({ primaryKey: true }),
    fecha_inicio: column.date(),
    fecha_fin: column.date(),
    tipo_practica: column.enum(['Normal', 'Extraordinaria'], { optional: false, default: 'Normal' }),
    estado: column.enum(['Pendiente', 'En curso', 'Finalizada', 'Cancelada'], { optional: false, default: 'Pendiente' }),
    comentarios: column.text(),
    fecha_creacion: column.date(),
    fecha_actualizacion: column.date(),
    alumno_id: column.number({ optional: false, references: () => Alumno.columns.alumno_id }),
    profesor_id: column.number({ optional: false, references: () => Profesor.columns.profesor_id }),
    empresa_id: column.number({ optional: false, references: () => Empresa.columns.empresa_id }),
    curso_id: column.number({ optional: false, references: () => Curso.columns.curso_id })
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
    nombre: column.text({ optional: false }),
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
    contacto_id: column.number({ optional: false, references: () => Contacto.columns.contacto_id }),
    empresa_id: column.number({ optional: false, references: () => Empresa.columns.empresa_id })
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
    estado: column.enum(['Pendiente', 'Cancelada', 'Finalizada'], { optional: false, default: 'Pendiente' }),
    comentarios: column.text(),
    fecha_interaccion: column.date(),
    fecha_creacion: column.date(),
    fecha_actualizacion: column.date(),
    empresa_id: column.number({ optional: false, references: () => Empresa.columns.empresa_id }),
    contacto_id: column.number({ references: () => Contacto.columns.contacto_id })
  }
});

const Registro = defineTable({
  columns: {
    registro_id: column.number({ primaryKey: true }),
    entidad: column.text({ optional: false }),
    id_entidad: column.number({ optional: false }),
    descripcion: column.text({ optional: false }),
    fecha_accion: column.date({ optional: false }),
    profesor_id: column.number({ optional: false, references: () => Profesor.columns.profesor_id })
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
});