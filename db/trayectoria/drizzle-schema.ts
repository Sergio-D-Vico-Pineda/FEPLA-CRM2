import { sqliteTable, text, integer, boolean } from 'drizzle-orm/sqlite-core';

export const instituto = sqliteTable('instituto', {
  instituto_id: integer('instituto_id').primaryKey(),
  nombre: text('nombre').notNull(),
  descripcion: text('descripcion'),
  direccion: text('direccion'),
  sitio_web: text('sitio_web'),
  telefono: text('telefono'),
  comentarios: text('comentarios'),
  fecha_creacion: text('fecha_creacion').notNull().default('CURRENT_TIMESTAMP'),
  fecha_actualizacion: text('fecha_actualizacion')
});

export const grupo = sqliteTable('grupo', {
  grupo_id: integer('grupo_id').primaryKey(),
  nombre: text('nombre').notNull(),
  descripcion: text('descripcion'),
  comentarios: text('comentarios'),
  fecha_creacion: text('fecha_creacion').notNull().default('CURRENT_TIMESTAMP'),
  fecha_actualizacion: text('fecha_actualizacion'),
  instituto_id: integer('instituto_id').references(() => instituto.instituto_id)
});

export const curso = sqliteTable('curso', {
  curso_id: integer('curso_id').primaryKey(),
  anio_academico: text('anio_academico').notNull()
});

export const alumno = sqliteTable('alumno', {
  alumno_id: integer('alumno_id').primaryKey(),
  nombre: text('nombre').notNull(),
  apellidos: text('apellidos'),
  telefono: text('telefono'),
  direccion: text('direccion'),
  fecha_nacimiento: text('fecha_nacimiento'),
  email: text('email').unique().notNull(),
  nif: text('nif'),
  nia: text('nia'),
  nuss: text('nuss'),
  comentarios: text('comentarios'),
  activo: boolean('activo').notNull().default(true),
  fecha_creacion: text('fecha_creacion').notNull().default('CURRENT_TIMESTAMP'),
  fecha_actualizacion: text('fecha_actualizacion')
});

export const inscripcion = sqliteTable('inscripcion', {
  inscripcion_id: integer('inscripcion_id').primaryKey(),
  fecha_inscripcion: text('fecha_inscripcion').notNull(),
  fecha_actualizacion: text('fecha_actualizacion'),
  alumno_id: integer('alumno_id').references(() => alumno.alumno_id),
  grupo_id: integer('grupo_id').references(() => grupo.grupo_id),
  curso_id: integer('curso_id').references(() => curso.curso_id)
});

export const profesor = sqliteTable('profesor', {
  profesor_id: integer('profesor_id').primaryKey(),
  nombre: text('nombre').notNull(),
  apellidos: text('apellidos'),
  telefono: text('telefono'),
  nif: text('nif'),
  nip: text('nip'),
  comentarios: text('comentarios'),
  fecha_creacion: text('fecha_creacion').notNull().default('CURRENT_TIMESTAMP'),
  fecha_actualizacion: text('fecha_actualizacion')
});

export const profesor_instituto = sqliteTable('profesor_instituto', {
  profesor_instituto_id: integer('profesor_instituto_id').primaryKey(),
  fecha_creacion: text('fecha_creacion').notNull().default('CURRENT_TIMESTAMP'),
  fecha_actualizacion: text('fecha_actualizacion'),
  profesor_id: integer('profesor_id').references(() => profesor.profesor_id).unique(),
  instituto_id: integer('instituto_id').references(() => instituto.instituto_id),
  curso_id: integer('curso_id').references(() => curso.curso_id).unique()
});

export const usuario = sqliteTable('usuario', {
  usuario_id: integer('usuario_id').primaryKey(),
  usuario: text('usuario').unique().notNull(),
  email: text('email').unique().notNull(),
  contrasena: text('contrasena').notNull(),
  rol: text('rol').notNull().default('Profesor'),
  activo: boolean('activo').notNull().default(true),
  profesor_id: integer('profesor_id').references(() => profesor.profesor_id).unique()
});

export const empresa = sqliteTable('empresa', {
  empresa_id: integer('empresa_id').primaryKey(),
  nombre: text('nombre').notNull(),
  nombre_empresarial: text('nombre_empresarial'),
  direccion: text('direccion'),
  cif: text('cif'),
  sitio_web: text('sitio_web'),
  sector: text('sector'),
  tecnologias: text('tecnologias'),
  comentarios: text('comentarios'),
  activo: boolean('activo').notNull().default(true),
  fecha_creacion: text('fecha_creacion').notNull().default('CURRENT_TIMESTAMP'),
  fecha_actualizacion: text('fecha_actualizacion')
});

export const practica = sqliteTable('practica', {
  practica_id: integer('practica_id').primaryKey(),
  fecha_inicio: text('fecha_inicio'),
  fecha_fin: text('fecha_fin'),
  tipo_practica: text('tipo_practica').notNull().default('Normal'),
  estado: text('estado').notNull().default('Pendiente'),
  comentarios: text('comentarios'),
  fecha_creacion: text('fecha_creacion').notNull().default('CURRENT_TIMESTAMP'),
  fecha_actualizacion: text('fecha_actualizacion'),
  alumno_id: integer('alumno_id').references(() => alumno.alumno_id).unique(),
  profesor_id: integer('profesor_id').references(() => profesor.profesor_id),
  empresa_id: integer('empresa_id').references(() => empresa.empresa_id),
  curso_id: integer('curso_id').references(() => curso.curso_id).unique()
});

export const contacto = sqliteTable('contacto', {
  contacto_id: integer('contacto_id').primaryKey(),
  nombre: text('nombre').notNull(),
  apellidos: text('apellidos'),
  telefono: text('telefono'),
  email: text('email').unique().notNull(),
  comentarios: text('comentarios'),
  fecha_creacion: text('fecha_creacion').notNull().default('CURRENT_TIMESTAMP'),
  fecha_actualizacion: text('fecha_actualizacion')
});

export const contacto_empresa = sqliteTable('contacto_empresa', {
  contacto_empresa_id: integer('contacto_empresa_id').primaryKey(),
  puesto: text('puesto'),
  fecha_creacion: text('fecha_creacion').notNull().default('CURRENT_TIMESTAMP'),
  fecha_actualizacion: text('fecha_actualizacion'),
  contacto_id: integer('contacto_id').references(() => contacto.contacto_id).unique(),
  empresa_id: integer('empresa_id').references(() => empresa.empresa_id).unique()
});

export const interaccion = sqliteTable('interaccion', {
  interaccion_id: integer('interaccion_id').primaryKey(),
  descripcion: text('descripcion'),
  tipo: text('tipo'),
  estado: text('estado').notNull().default('Pendiente'),
  comentarios: text('comentarios'),
  fecha_interaccion: text('fecha_interaccion'),
  fecha_creacion: text('fecha_creacion').notNull().default('CURRENT_TIMESTAMP'),
  fecha_actualizacion: text('fecha_actualizacion'),
  empresa_id: integer('empresa_id').references(() => empresa.empresa_id),
  contacto_id: integer('contacto_id').references(() => contacto.contacto_id)
});

export const registro = sqliteTable('registro', {
  registro_id: integer('registro_id').primaryKey(),
  entidad: text('entidad').notNull(),
  id_entidad: integer('id_entidad').notNull(),
  descripcion: text('descripcion').notNull(),
  fecha_accion: text('fecha_accion').notNull().default('CURRENT_TIMESTAMP'),
  profesor_id: integer('profesor_id').references(() => profesor.profesor_id)
});