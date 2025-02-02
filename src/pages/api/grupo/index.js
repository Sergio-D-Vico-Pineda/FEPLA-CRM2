import prisma from "@db/index.js";
import createRegistro from "@utils";

async function GET() {
    return new Response("Grupo API", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();

    try {
        const newGroup = await prisma.grupo.create({
            data: {
                nombre: data.nombre,
                descripcion: data.descripcion,
                comentarios: data.comentarios,
                id_instituto: data.id_instituto
            }
        })

        const log = await createRegistro(prisma, { id_entidad: newGroup.id_grupo, id_profesor: data.id_active_user }, "Grupo", "creación de grupo");
        console.log(log);

        newGroup.message = "Grupo creado exitosamente.";
        return new Response(JSON.stringify(newGroup), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Grupo no creado."
        }), { status: 404 });
    }
}

async function DELETE({ request }) {
    const data = await request.json();
    try {
        await prisma.grupo.delete({
            where: {
                id_grupo: data.id_grupo
            }
        })

        const log = await createRegistro(prisma, { id_entidad: data.id_grupo, id_profesor: data.id_active_user }, "Grupo", "eliminación de grupo");
        console.log(log);

        return new Response(JSON.stringify({ message: "Grupo eliminado exitosamente." }), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: `Grupo no eliminado. ${error.code}` }), { status: 404 });
    }
}

export { GET, POST, DELETE };   