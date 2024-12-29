import { defineDb, defineTable, column } from 'astro:db';

const Instituto = defineTable({
  columns: {
    instituto_id: column.number({ primaryKey: true }),
    nombre: column.text({ optional: false }),
    descripcion: column.text({ optional: true }),
    direccion: column.text({ optional: true }),
    sitio_web: column.text({ optional: true }),
    telefono: column.text({ optional: true }),
    comentarios: column.text({ optional: true }),
    fecha_creacion: column.date({ optional: false }),
    fecha_actualizacion: column.date({ optional: true })
  }
});

const Grupo = defineTable({
  columns: {
    grupo_id: column.number({ primaryKey: true }),
    nombre: column.text({ optional: false }),
    descripcion: column.text({ optional: true }),
    comentarios: column.text({ optional: true }),
    fecha_creacion: column.date({ optional: false }),
    fecha_actualizacion: column.date({ optional: true }),
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
    apellidos: column.text({ optional: true }),
    telefono: column.text({ optional: true }),
    direccion: column.text({ optional: true }),
    fecha_nacimiento: column.date({ optional: true }),
    email: column.text({ unique: true }),
    nif: column.text({ optional: true }),
    nia: column.text({ optional: true }),
    nuss: column.text({ optional: true }),
    comentarios: column.text({ optional: true }),
    activo: column.boolean({ optional: false, default: true }),
    fecha_creacion: column.date({ optional: false }),
    fecha_actualizacion: column.date({ optional: true })
  }
});

const Inscripcion = defineTable({
  columns: {
    inscripcion_id: column.number({ primaryKey: true }),
    fecha_inscripcion: column.date({ optional: false }),
    fecha_actualizacion: column.date({ optional: true }),
    alumno_id: column.number({ optional: false, references: () => Alumno.columns.alumno_id }),
    grupo_id: column.number({ optional: false, references: () => Grupo.columns.grupo_id }),
    curso_id: column.number({ optional: false, references: () => Curso.columns.curso_id })
  }
});

const Profesor = defineTable({
  columns: {
    profesor_id: column.number({ primaryKey: true }),
    nombre: column.text({ optional: false }),
    apellidos: column.text({ optional: true }),
    telefono: column.text({ optional: true }),
    nif: column.text({ optional: true }),
    nip: column.text({ optional: true }),
    comentarios: column.text({ optional: true }),
    fecha_creacion: column.date({ optional: false }),
    fecha_actualizacion: column.date({ optional: true })
  }
});

const ProfesorInstituto = defineTable({
  columns: {
    profesor_instituto_id: column.number({ primaryKey: true }),
    fecha_creacion: column.date({ optional: false }),
    fecha_actualizacion: column.date({ optional: true }),
    profesor_id: column.number({ unique: true, optional: false, references: () => Profesor.columns.profesor_id }),
    instituto_id: column.number({ optional: false, references: () => Instituto.columns.instituto_id }),
    curso_id: column.number({ unique: true, optional: false, references: () => Curso.columns.curso_id })
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
    nombre_empresarial: column.text({ optional: true }),
    direccion: column.text({ optional: true }),
    cif: column.text({ optional: true }),
    sitio_web: column.text({ optional: true }),
    sector: column.text({ optional: true }),
    tecnologias: column.text({ optional: true }),
    comentarios: column.text({ optional: true }),
    activo: column.boolean({ optional: false, default: true }),
    fecha_creacion: column.date({ optional: true }),
    fecha_actualizacion: column.date({ optional: true })
  }
});

const Practica = defineTable({
  columns: {
    practica_id: column.number({ primaryKey: true }),
    fecha_inicio: column.date({ optional: true }),
    fecha_fin: column.date({ optional: true }),
    tipo_practica: column.enum(['Normal', 'Extraordinaria'], { optional: false, default: 'Normal' }),
    estado: column.enum(['Pendiente', 'En curso', 'Finalizada', 'Cancelada'], { optional: false, default: 'Pendiente' }),
    comentarios: column.text({ optional: true }),
    fecha_creacion: column.date({ optional: true }),
    fecha_actualizacion: column.date({ optional: true }),
    alumno_id: column.number({ unique: true, optional: false, references: () => Alumno.columns.alumno_id }),
    profesor_id: column.number({ optional: false, references: () => Profesor.columns.profesor_id }),
    empresa_id: column.number({ optional: false, references: () => Empresa.columns.empresa_id }),
    curso_id: column.number({ unique: true, optional: false, references: () => Curso.columns.curso_id })
  }
});

const Contacto = defineTable({
  columns: {
    contacto_id: column.number({ primaryKey: true }),
    nombre: column.text({ optional: false }),
    apellidos: column.text({ optional: true }),
    telefono: column.text({ optional: true }),
    email: column.text({ unique: true }),
    comentarios: column.text({ optional: true }),
    fecha_creacion: column.date({ optional: true }),
    fecha_actualizacion: column.date({ optional: true })
  }
});

const ContactoEmpresa = defineTable({
  columns: {
    contacto_empresa_id: column.number({ primaryKey: true }),
    puesto: column.text({ optional: true }),
    fecha_creacion: column.date({ optional: true }),
    fecha_actualizacion: column.date({ optional: true }),
    contacto_id: column.number({ unique: true, optional: false, references: () => Contacto.columns.contacto_id }),
    empresa_id: column.number({ unique: true, optional: false, references: () => Empresa.columns.empresa_id })
  }
});

const Interaccion = defineTable({
  columns: {
    interaccion_id: column.number({ primaryKey: true }),
    descripcion: column.text({ optional: true }),
    tipo: column.text({ optional: true }),
    estado: column.enum(['Pendiente', 'Cancelada', 'Finalizada'], { optional: false, default: 'Pendiente' }),
    comentarios: column.text({ optional: true }),
    fecha_interaccion: column.date({ optional: true }),
    fecha_creacion: column.date({ optional: true }),
    fecha_actualizacion: column.date({ optional: true }),
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