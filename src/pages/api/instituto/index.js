import prisma from "@db/index.js";
import createRegistro from "../utils";

async function GET() {
    return new Response("Instituto API", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();

    try {

        const newInst = await prisma.instituto.create({
            data: {
                nombre: data.nombre,
                descripcion: data.descripcion,
                direccion: data.direccion,
                sitio_web: data.sitio_web,
                telefono: data.telefono,
                comentarios: data.comentarios
            }
        })

        const log = createRegistro(prisma, { id_entidad: newInst.id_instituto, id_profesor: data.id_active_user }, "Instituto", "creación de instituto");
        console.log(log);
        newInst.message = "Instituto creado exitosamente.";

        return new Response(JSON.stringify(newInst), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Instituto no creado"
        }), { status: 404 });
    }
}

async function PATCH({ request }) {
    const data = await request.json();

    try {
        const inst = await prisma.instituto.update({
            where: {
                id_instituto: data.id_instituto
            },
            data: {
                nombre: data.nombre,
                descripcion: data.descripcion,
                direccion: data.direccion,
                sitio_web: data.sitio_web,
                telefono: data.telefono,
                comentarios: data.comentarios
            }
        })

        const log = await createRegistro(prisma, { id_entidad: data.id_instituto, id_profesor: data.id_active_user }, "Instituto", "actualización de instituto");
        console.log(log)

        return new Response(JSON.stringify({ message: "Instituto actualizado exitosamente." }), { status: 200, headers: { "Content-Type": "application/json", }, });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "Instituto no actualizado" }), { status: 404 });
    }
}

export { GET, POST, PATCH };