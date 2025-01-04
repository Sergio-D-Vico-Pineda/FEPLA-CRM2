import prisma from "./conex.js";

async function main() {
    const inscripciones = await prisma.inscripcion.deleteMany({});
    const grupos = await prisma.grupo.deleteMany({});
    const alumnos = await prisma.alumno.deleteMany({});
    const cursos = await prisma.curso.deleteMany({});
    const instituto = await prisma.instituto.deleteMany({});
    const profesores = await prisma.profesor.deleteMany({});
    const profesorInstituto = await prisma.profesor_Instituto.deleteMany({});
    const empresas = await prisma.empresa.deleteMany({});
    const practicas = await prisma.practica.deleteMany({});
    const contacto = await prisma.contacto.deleteMany({});
    const contactoEmpresa = await prisma.contacto_Empresa.deleteMany({});
    const interaccion = await prisma.interaccion.deleteMany({});
    const registro = await prisma.registro.deleteMany({});

    console.log({ instituto, cursos, grupos, alumnos, inscripciones, profesores, profesorInstituto, empresas, practicas, contacto, contactoEmpresa, interaccion, registro })
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