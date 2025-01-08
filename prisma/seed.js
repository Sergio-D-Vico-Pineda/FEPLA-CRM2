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
                { id_curso: 1, anio_academico: '2022/2023' },
                { id_curso: 2, anio_academico: '2023/2024' },
                { id_curso: 3, anio_academico: '2024/2025' },
                { id_curso: 4, anio_academico: '2025/2026' },
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
                { id_grupo: 1, nombre: '1 DAW', id_instituto: 1 },
                { id_grupo: 2, nombre: '2 DAW', id_instituto: 1 },
                { id_grupo: 3, nombre: '1 DAM', id_instituto: 1 },
                { id_grupo: 4, nombre: '2 DAM', id_instituto: 1 },
                { id_grupo: 5, nombre: '1 ASIR', id_instituto: 1 },
                { id_grupo: 6, nombre: '2 ASIR', id_instituto: 1 },
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
                { id_profesor: 1, nombre: 'Sergio', apellidos: 'Vico', telefono: '123456789', nif: '123456789', nip: '123456789', comentarios: 'Admin' },
                { id_profesor: 2, nombre: 'Vicente', apellidos: 'Santonja', telefono: '987654321', nif: '987654321', nip: '987654321', comentarios: 'Comentarios 2' },
                { id_profesor: 3, nombre: 'Luis', apellidos: 'Alemañ', telefono: '555555555', nif: '555555555', nip: '555555555', comentarios: 'Comentarios 3' },
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
                { id_profesor_instituto: 1, id_profesor: 1, id_instituto: 1, id_curso: 1 },
                { id_profesor_instituto: 2, id_profesor: 2, id_instituto: 1, id_curso: 1 },
                { id_profesor_instituto: 3, id_profesor: 3, id_instituto: 1, id_curso: 1 },
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
                { id_usuario: 2, usuario: 'vjsan', email: 'vjsan@fepla.es', contrasena: 'prof', rol: 'Prof', activo: true, id_profesor: 2 },
                { id_usuario: 3, usuario: 'lupastance', email: 'lale@fepla.es', contrasena: 'prof', rol: 'Prof', activo: true, id_profesor: 3 },
                { id_usuario: 4, usuario: 'prof', email: 'prof@fepla.es', contrasena: 'prof', rol: 'Prof', activo: true, id_profesor: 1 },
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
                { id_alumno: 1, nombre: 'Sergio', apellidos: 'Vico', telefono: '123456789', nif: '123456788', nia: '10651110', nuss: '123456789', comentarios: 'Es un admin también' },
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
                { id_empresa: 2, nombre: 'Logitech', nombre_empresarial: 'Logitech S.A.', sitio_web: 'po.ta.to', direccion: 'Calle 2', comentarios: 'Comentarios 2' },
                { id_empresa: 3, nombre: 'Mircosoft', nombre_empresarial: 'Microsoft S.A.', sitio_web: 'ieselpla.es', direccion: 'Calle 3', comentarios: 'Comentarios 3', activo: false }
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
                { id_contacto: 1, nombre: 'David', apellidos: 'Perez', telefono: '123456789', email: 'dper@fepla.es', comentarios: 'Comentarios 1' },
                { id_contacto: 2, nombre: 'Rafael', apellidos: 'Sánchez', telefono: '987654321', email: 'rsan@fepla.es', comentarios: 'Comentarios 2' },
                { id_contacto: 3, nombre: 'Fernando', apellidos: 'Alonsa', telefono: '555555555', email: 'lale@fepla.es', comentarios: 'Comentarios 3' }
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