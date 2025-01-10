import prisma from "@db/index.js";
import createRegistro from "../utils.js";

async function GET() {
    return new Response("Alumno API", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();
    console.log(data)
    try {
        const newAlum = await prisma.alumno.create({
            data: {
                nombre: data.nombre,
                apellidos: data.apellidos,
                telefono: data.telefono,
                fecha_nacimiento: data.fecha_nacimiento == "" ? null : new Date(data.fecha_nacimiento),
                direccion: data.direccion,
                email: data.email,
                nif: data.nif,
                nia: data.nia,
                nuss: data.nuss,
                comentarios: data.comentarios,
                inscripciones: {
                    create: {
                        id_curso: data.id_curso,
                        id_grupo: data.id_grupo
                    }
                }
            }
        })

        const log = await createRegistro(prisma, { id_entidad: newAlum.id_alumno, id_profesor: data.id_active_user }, "Alumno", "creación de alumno");
        console.log(log);
        newAlum.message = "Alumno creado exitosamente.";

        return new Response(JSON.stringify(
            newAlum
        ), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Alumno no creado."
        }), { status: 404 });
    }
}

async function PATCH({ request }) {
    const data = await request.json();

    return new Response(JSON.stringify(data), { status: 200 });
}

async function PUT({ request }) {
    const data = await request.json();
    return new Response(JSON.stringify(data), { status: 200 });
}

export { GET, POST, PATCH, PUT };