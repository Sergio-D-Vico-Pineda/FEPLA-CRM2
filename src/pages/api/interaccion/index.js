import prisma from "@db/index.js";
import createRegistro from "@utils";

async function GET() {
    return new Response("Interacción API", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();
    try {

        const newInter = await prisma.interaccion.create({
            data: {
                descripcion: data.descripcion,
                tipo: data.tipo,
                estado: data.estado,
                comentarios: data.comentarios,
                fecha_interaccion: data.fecha_interaccion == "" || null ? null : new Date(data.fecha_interaccion),
                id_contacto: data.id_contacto,
                id_empresa: data.id_empresa
            }
        })

        const log = await createRegistro(prisma, { id_entidad: newInter.id_interaccion, id_profesor: data.id_active_user }, "Interacción", "creación de interacción");
        console.log(log)

        newInter.message = "Interacción creada exitosamente.";

        return new Response(JSON.stringify(newInter), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "Interacción no creado" }), { status: 404 });
    }
}

async function PATCH({ request }) {
    const data = await request.json();

    try {
        const inter = await prisma.interaccion.update({
            where: {
                id_interaccion: data.id_interaccion
            },
            data: {
                descripcion: data.descripcion,
                tipo: data.tipo,
                estado: data.estado,
                comentarios: data.comentarios,
                fecha_interaccion: data.fecha_interaccion == "" || null ? null : new Date(data.fecha_interaccion),
                id_contacto: data.id_contacto,
                id_empresa: data.id_empresa
            }
        })

        const log = await createRegistro(prisma, { id_entidad: data.id_interaccion, id_profesor: data.id_active_user }, "Interacción", "actualización de interacción");

        return new Response(JSON.stringify({ message: "Interacción actualizada" }), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "Interacción no actualizado" }), { status: 404 });
    }
}

async function DELETE({ request }) {
    const data = await request.json();
    try {

        const inter = await prisma.interaccion.delete({
            where: {
                id_interaccion: data.id_interaccion
            }
        })

        const log = await createRegistro(prisma, { id_entidad: data.id_interaccion, id_profesor: data.id_active_user }, "Interacción", "eliminación de interacción");
        console.log("INTERACCIÓN ELIMINADA");

        return new Response(JSON.stringify({ message: "Interacción eliminada exitosamente." }), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Interacción no eliminada."
        }), { status: 404 });
    }
}

export { GET, POST, PATCH, DELETE };