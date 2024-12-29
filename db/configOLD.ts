import { defineDb, defineTable, column } from 'astro:db';

/* // https://astro.build/db/config
const Users = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        name: column.text(),
        email: column.text(),
        password: column.text(),
    },
});

export default defineDb({
    tables: {
        Users,
    },
}); */

const Contacto = defineTable({
  columns: {
    contacto_id: column.number({ primaryKey: true }),
    nombre: column.text(),
    apellidos: column.text(),
    telefono: column.text(),
    email: column.text(),
    puesto: column.text(),
    comentarios: column.text(),
    fecha_creacion: column.date(),
    fecha_actualizacion: column.date(),
  },
});

const Empresa = defineTable({
  columns: {
    empresa_id: column.number({ primaryKey: true }),
    nombre: column.text(),
    nombre_oficial: column.text(),
    direccion: column.text(),
    cif: column.text(),
    sitio_web: column.text(),
    sector: column.text(),
    tecnologias: column.text(),
    comentarios: column.text(),
    fecha_creacion: column.date(),
    fecha_actualizacion: column.date(),
    activo: column.boolean(),
    contacto_id: column.number({ references: () => Contacto.columns.contacto_id }),
  },
});

const Interaccion = defineTable({
  columns: {
    interaccion_id: column.number({ primaryKey: true }),
    fecha: column.date(),
    tipo: column.text(),
    comentarios: column.text(),
    objetivo: column.text(),
    resultado: column.text(),
    contacto_id: column.number({ references: () => Contacto.columns.contacto_id }),
    empresa_id: column.number({ references: () => Empresa.columns.empresa_id }),
  },
});

const Instituto = defineTable({
  columns: {
    instituto_id: column.number({ primaryKey: true }),
    nombre: column.text(),
    descripcion: column.text(),
    direccion: column.text(),
    sitio_web: column.text(),
    telefono: column.text(),
    comentarios: column.text(),
    fecha_creacion: column.date(),
    fecha_actualizacion: column.date(),
  },
});

const Grupo = defineTable({
  columns: {
    grupo_id: column.number({ primaryKey: true }),
    nombre: column.text(),
    descripcion: column.text(),
    curso: column.text(),
    comentarios: column.text(),
    fecha_creacion: column.date(),
    fecha_actualizacion: column.date(),
  },
});

const Alumno = defineTable({
  columns: {
    alumno_id: column.number({ primaryKey: true }),
    nombre: column.text(),
    apellidos: column.text(),
    telefono: column.text(),
    fecha_nacimiento: column.date(),
    email: column.text(),
    nif: column.text(),
    nia: column.text(),
    nuss: column.text(),
    comentarios: column.text(),
    fecha_creacion: column.date(),
    fecha_actualizacion: column.date(),
    activo: column.boolean(),
    grupo_id: column.number({ references: () => Grupo.columns.grupo_id }),
    instituto_id: column.number({ references: () => Instituto.columns.instituto_id }),
  },
});

const Profesor = defineTable({
  columns: {
    profesor_id: column.number({ primaryKey: true }),
    nombre: column.text(),
    apellidos: column.text(),
    telefono: column.text(),
    email: column.text(),
    nif: column.text(),
    nip: column.text(),
    comentarios: column.text(),
    fecha_creacion: column.date(),
    fecha_actualizacion: column.date(),
    grupo_id: column.number({ references: () => Grupo.columns.grupo_id }),
    instituto_id: column.number({ references: () => Instituto.columns.instituto_id }),
    usuario_id: column.number({ references: () => Usuario.columns.usuario_id }),
  },
});

const Usuario = defineTable({
  columns: {
    usuario_id: column.number({ primaryKey: true }),
    usuario: column.text(),
    email: column.text(),
    contrasena: column.text(),
    rol: column.text(), // Para almacenar 'Prof' o 'Admin'
    activo: column.boolean(),
  },
});

const pro_alu_emp = defineTable({
  columns: {
    pro_alu_emp_id: column.number({ primaryKey: true }),
    fecha_inicio: column.date(),
    fecha_fin: column.date(),
    estado: column.text(),
    curso: column.text(),
    tutor_emp: column.text(),
    comentarios: column.text(),
    fecha_creacion: column.date(),
    fecha_actualizacion: column.date(),
    profesor_id: column.number({ references: () => Profesor.columns.profesor_id }),
    alumno_id: column.number({ references: () => Alumno.columns.alumno_id }),
    empresa_id: column.number({ references: () => Empresa.columns.empresa_id }),
    instituto_id: column.number({ references: () => Instituto.columns.instituto_id }),
    grupo_id: column.number({ references: () => Grupo.columns.grupo_id }),
  },
});

export default defineDb({
  tables: {
    Contacto,
    Empresa,
    Interaccion,
    Instituto,
    Grupo,
    Alumno,
    Profesor,
    Usuario,
    pro_alu_emp,
  },
});