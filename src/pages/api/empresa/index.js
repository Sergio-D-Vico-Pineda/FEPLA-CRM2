import prisma from "@db/index.js";
import createRegistro from "@utils";

async function GET() {
    return new Response("Empresa API", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();

    try {
        const newEmpr = await prisma.empresa.create({
            data: {
                nombre: data.nombre,
                nombre_empresarial: data.nombre_oficial,
                direccion: data.direccion,
                cif: data.cif,
                sitio_web: data.sitio_web,
                sector: data.sector,
                tecnologias: data.tecnologias,
                comentarios: data.comentarios,
            }
        })

        const log = await createRegistro(prisma, { id_entidad: newEmpr.id_empresa, id_profesor: data.id_active_user }, "Empresa", "creación de empresa");
        console.log(log);
        newEmpr.message = "Empresa creada exitosamente.";

        return new Response(JSON.stringify(newEmpr), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Empresa no creada."
        }), { status: 404 });
    }
}

async function PATCH({ request }) {
    const data = await request.json();

    if (data.id_empresa == null) {
        return new Response(JSON.stringify({
            message: "Empresa no actualizada. Sin ID"
        }), { status: 404 });
    }
    try {

        const emp = await prisma.empresa.update({
            where: {
                id_empresa: data.id_empresa
            },
            data: {
                nombre: data.nombre,
                nombre_empresarial: data.nombre_oficial,
                direccion: data.direccion,
                cif: data.cif,
                sitio_web: data.sitio_web,
                sector: data.sector,
                tecnologias: data.tecnologias,
                comentarios: data.comentarios,
            }
        })

        const log = await createRegistro(prisma, { id_entidad: data.id_empresa, id_profesor: data.id_active_user }, "Empresa", "actualización de empresa");

        return new Response(JSON.stringify({ message: "Empresa actualizada exitosamente." }), { status: 200, headers: { "Content-Type": "application/json", }, });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "Empresa no actualizada." }), { status: 404 });
    }

}

async function PUT({ request }) {
    const data = await request.json();

    try {
        const emp = await prisma.empresa.update({
            where: {
                id_empresa: data.id_empresa
            },
            data: {
                activo: data.activo
            }
        })

        return new Response(JSON.stringify(
            {
                message: data.activo ? "Empresa activada." : "Empresa desactivada."
            }),
            {
                status: 200,
                headers:
                {
                    "Content-Type": "application/json",
                },
            });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Empresa no actualizada."
        }), { status: 404 });
    }
}

async function DELETE({ request }) {
    const data = await request.json();

    try {
        await prisma.empresa.deleteMany({
            where: {
                id_empresa: data.id_empresa
            }
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "Empresa no eliminada." }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Empresa eliminada exitosamente." }), { status: 200 });
}

export { GET, POST, PATCH, PUT, DELETE };