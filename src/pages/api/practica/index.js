import prisma from "@db/index.js";
import createRegistro from "../utils.js";

async function GET() {
    return new Response("Práctica API", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();
    console.log(data);

    try {
        const newPrac = await prisma.practica.create({
            data: {
                fecha_inicio: data.fecha_inicio == "" || null ? null : new Date(data.fecha_inicio),
                fecha_fin: data.fecha_fin == "" || null ? null : new Date(data.fecha_fin),
                tipo_practica: data.tipo_practica,
                estado: data.estado,
                comentarios: data.comentarios,
                id_alumno: data.id_alumno,
                id_profesor: data.id_profesor,
                id_empresa: data.id_empresa,
                id_curso: data.id_curso,
            }
        })

        const log = await createRegistro(prisma, { id_entidad: newPrac.id_practica, id_profesor: data.id_active_user }, "Práctica", "creación de práctica");
        console.log(log);
        newPrac.message = "Práctica creada exitosamente.";

        return new Response(JSON.stringify(newPrac), { status: 200 });
    } catch (error) {
        console.log(error.code);
        if (error.code === "SQLITE_CONSTRAINT") {
            return new Response(JSON.stringify({ message: "Práctica no creada (El alumno ya tiene una práctica en ese curso)." }), { status: 400 });
        }
        return new Response(JSON.stringify({
            message: `Práctica no creada. Error: ${error.code}`
        }), { status: 404 });
    }
}

async function PATCH({ request }) {
    const data = await request.json();

    try {
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "User not found"
        }), { status: 404 });
    }
}

async function PUT({ request }) {
    const data = await request.json();
    try {
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "User not found"
        }), { status: 404 });
    }
}

export { GET, POST, PATCH, PUT };