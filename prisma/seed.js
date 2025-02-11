import prisma from "./conex.js";

async function main() {
    let instituto, cursos, grupos, profesores, prof_inst, usuarios, alumnos, empresas, contactos, cont_emp;

    try {
        instituto = await prisma.instituto.createMany({
            data: [
                { id_instituto: 1, nombre: 'IES El Pla' }
            ],
        })
        console.log("Instituto creado exitosamente.")
    } catch (error) {
        if (error.code == "SQLITE_CONSTRAINT") {
            console.log("Instituto ya creado.");
        } else {
            console.log("Error Instituto: " + error);
        }
    }

    try {
        cursos = await prisma.curso.createMany({
            data: [
                { id_curso: 1, anio_academico: '2022/2023' }
            ],
        })
        console.log("Cursos creado exitosamente.")
    } catch (error) {
        if (error.code == "SQLITE_CONSTRAINT") {
            console.log("Cursos ya creados.");
        } else {
            console.log("Error Cursos: " + error);
        }
    }

    try {
        grupos = await prisma.grupo.createMany({
            data: [
                { id_grupo: 1, nombre: '1 DAW', id_instituto: 1 }
            ],
        })
        console.log("Grupos creado exitosamente.")
    } catch (error) {
        if (error.code == "SQLITE_CONSTRAINT") {
            console.log("Grupos ya creados.");
        } else {
            console.log("Error Grupos: " + error);
        }
    }

    try {

        profesores = await prisma.profesor.createMany({
            data: [
                { id_profesor: 0, nombre: 'Admin' },
                { id_profesor: 1, nombre: 'Sergio', apellidos: 'Vico', telefono: '123456789', nif: '123456789', nip: '123456789', comentarios: 'Comentarios 1' }
            ],
        })
        console.log("Profesores creado exitosamente.")
    } catch (error) {
        if (error.code == "SQLITE_CONSTRAINT") {
            console.log("Profesores ya creados.");
        } else {
            console.log("Error Profesores: " + error);
        }
    }
    try {

        prof_inst = await prisma.profesor_Instituto.createMany({
            data: [
                { id_profesor_instituto: 1, id_profesor: 1, id_instituto: 1, id_curso: 1 }
            ],
        })
        console.log("Profesores_Institutos creado exitosamente.")
    } catch (error) {
        if (error.code == "SQLITE_CONSTRAINT") {
            console.log("Profesores_Institutos ya creados.");
        } else {
            console.log("Error Profesores_Institutos: " + error);
        }
    }
    try {

        usuarios = await prisma.usuario.createMany({
            data: [
                { id_usuario: 1, usuario: 'admin', email: 'admin@fepla.es', contrasena: 'admin', rol: 'Admin', activo: true, id_profesor: 0 },
                { id_usuario: 2, usuario: 'scarpy', email: 'scarpy@fepla.es', contrasena: 'prof', rol: 'Prof', activo: true, id_profesor: 1 }
            ],
        })
        console.log("Usuarios creado exitosamente.")
    } catch (error) {
        if (error.code == "SQLITE_CONSTRAINT") {
            console.log("Usuarios ya creados.");
        } else {
            console.log("Error Usuarios: " + error);
        }
    }
    try {

        alumnos = await prisma.alumno.createMany({
            data: [
                { id_alumno: 1, nombre: 'Sergio', apellidos: 'Vico', telefono: '123456789', nif: '123456788', nia: '10651110', nuss: '123456789', comentarios: 'Es un alumno' },
                { id_alumno: 2, nombre: 'Rafa', apellidos: 'Sánchez', telefono: '987654321', nif: '987654321', nia: '21762221', nuss: '987654321', comentarios: 'Comentarios 2' }
            ],
        })
        console.log("Alumnos creado exitosamente.")
    } catch (error) {
        if (error.code == "SQLITE_CONSTRAINT") {
            console.log("Alumnos ya creados.");
        } else {
            console.log("Error Alumnos: " + error);
        }
    }

    try {
        empresas = await prisma.empresa.createMany({
            data: [
                { id_empresa: 1, nombre: 'Banco Sabadell', nombre_empresarial: 'Banco Sabadell S.A.', direccion: 'Calle 1', comentarios: 'Comentarios 1' },
                { id_empresa: 2, nombre: 'Mircosoft', nombre_empresarial: 'Microsoft S.A.', sitio_web: 'ieselpla.es', direccion: 'Calle 3', comentarios: 'Comentarios 2', activo: false }
            ],
        })
        console.log("Empresas creado exitosamente.")
    } catch (error) {
        if (error.code == "SQLITE_CONSTRAINT") {
            console.log("Empresas ya creadas.");
        } else {
            console.log("Error Empresas: " + error);
        }
    }
    try {
        contactos = await prisma.contacto.createMany({
            data: [
                { id_contacto: 1, nombre: 'David', apellidos: 'Perez', telefono: '123456789', email: 'dper@fepla.es', comentarios: 'Comentarios 1' }
            ]
        })
        console.log("Contactos creado exitosamente.")
    } catch (error) {
        if (error.code == "SQLITE_CONSTRAINT") {
            console.log("Contactos ya creados.");
        } else {
            console.log("Error Contactos: " + error);
        }
    }

    try {

        cont_emp = await prisma.contacto_Empresa.createMany({
            data: [
                { id_contacto_empresa: 1, id_contacto: 1, id_empresa: 1 },
                { id_contacto_empresa: 2, id_contacto: 2, id_empresa: 2 },
            ]
        })
        console.log("Contactos_Empresas creado exitosamente.")
    } catch (error) {
        if (error.code == "SQLITE_CONSTRAINT") {
            console.log("Contactos_Empresas ya creados.");
        } else {
            console.log("Error Contactos_Empresas: " + error);
        }
    }

    // Practica, interaccion, inscripcion, registro
    console.log({ instituto, cursos, grupos, profesores, prof_inst, usuarios, alumnos, empresas, contactos, cont_emp })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })