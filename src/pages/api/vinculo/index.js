import prisma from "@db/index.js";
import createRegistro from "@utils";

async function GET() {
    return new Response("Vinculo API", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();

    try {
        return new Response(JSON.stringify(), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: " * no creado"
        }), { status: 404 });
    }
}

async function PATCH({ request }) {
    const data = await request.json();

    console.log(data)

    try {

        const vinc = await prisma.contacto_Empresa.update({
            where: {
                id_contacto_empresa: data.id_contacto_empresa
            },
            data: {
                id_empresa: data.id_empresa,
                puesto: data.puesto
            }
        })

        const log = await createRegistro(prisma, { id_entidad: data.id_contacto_empresa, id_profesor: data.id_active_user }, "Vinculo", "actualización de vinculo");

        return new Response(JSON.stringify({ message: "Vinculo actualizado exitosamente." }), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "* no actualizado"
        }), { status: 404 });
    }
}

async function PUT({ request }) {
    const data = await request.json();
    try {
        return new Response(JSON.stringify(), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: " * no actualizado"
        }), { status: 404 });
    }
}

export { GET, POST, PATCH, PUT };