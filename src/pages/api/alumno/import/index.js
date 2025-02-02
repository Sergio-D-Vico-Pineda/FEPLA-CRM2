import prisma from "@db/index.js";
import createRegistro from "@utils";

async function GET() {
    const delemp = await prisma.alumno.deleteMany({
        where: {
            fecha_creacion: new Date("2000-01-01T10:00:10.827Z")
        }
    });

    return new Response(JSON.stringify({ message: `${delemp.count} alumnos eliminados.` }), { status: 200 });
}

async function POST({ request }) {
    let counter = 0;
    const data = await request.json();
    const errormsg = { message: "" }

    try {
        console.log(data)
        counter = data.alumnos.length
        const alumnos = data.alumnos;

        for (const alumno of alumnos) {
            try {
                const newAlu = await prisma.alumno.create({
                    data: {
                        nombre: alumno.nombre,
                        apellidos: alumno.apellidos,
                        telefono: alumno.telefono,
                        direccion: alumno.direccion,
                        fecha_nacimiento: alumno.fecha_nacimiento == null || alumno.fecha_nacimiento == "" ? null : new Date(alumno.fecha_nacimiento),
                        email: alumno.email,
                        nif: alumno.nif,
                        nia: alumno.nia,
                        nuss: alumno.nuss,
                        comentarios: alumno.comentarios,
                        activo: alumno.activo,
                        fecha_creacion: alumno.fecha_creacion == null || alumno.fecha_creacion == "" ? new Date() : new Date(alumno.fecha_creacion),
                    }
                });
            } catch (error) {
                if (error.code === "SQLITE_CONSTRAINT") {
                    console.log("Error creating alumno:", alumno.nombre);
                    errormsg.message += `\nNo se ha podido crear el alumno: ${alumno.nombre}\n`;
                }
                counter--;
                continue;
            }
        }

        const log = await createRegistro(prisma, { id_entidad: 0, id_profesor: data.id_active_user }, "alumno", "importación de alumnos");
        console.log(log);

        if (counter == 0) {
            errormsg.message += "\nNo se han creado alumnos."
            return new Response(JSON.stringify(errormsg), { status: 500 });
        }
    } catch (error) {
        console.error("Error in POST:", error);
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify({ message: `${counter} alumnos creados.` }), { status: 201 });
}

export { GET, POST };