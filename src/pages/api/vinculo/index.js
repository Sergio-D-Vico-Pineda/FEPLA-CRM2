import prisma from "@db/index.js";
import createRegistro from "@utils";

async function GET() {
    return new Response("Vínculo API", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();

    try {
        const newVinc = await prisma.contacto_Empresa.create({
            data: {
                id_contacto: data.id_contacto,
                id_empresa: data.id_empresa,
                puesto: data.puesto
            }
        })

        const log = await createRegistro(prisma, { id_entidad: newVinc.id_contacto_empresa, id_profesor: data.id_active_user }, "Vínculo", "creación de vínculo");
        console.log(log);
        newVinc.message = "Vínculo creado exitosamente.";

        return new Response(JSON.stringify(newVinc), { status: 200 });
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT") {
            return new Response(JSON.stringify({ message: "Vínculo no creado (El contacto ya tiene un vinculo con la empresa seleccionada)." }), { status: 400 });
        }
        console.log(error)
        return new Response(JSON.stringify({
            message: "Vínculo no creado."
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

        const log = await createRegistro(prisma, { id_entidad: data.id_contacto_empresa, id_profesor: data.id_active_user }, "Vínculo", "actualización de vínculo");

        return new Response(JSON.stringify({ message: "Vínculo actualizado exitosamente." }), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Vínculo no actualizado."
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
            message: "Vínculo no actualizado."
        }), { status: 404 });
    }
}

async function DELETE({ request }) {
    const data = await request.json();
    try {

        const vinc = await prisma.contacto_Empresa.delete({
            where: {
                id_contacto_empresa: data.id_contacto_empresa
            }
        })

        const log = await createRegistro(prisma, { id_entidad: data.id_contacto_empresa, id_profesor: data.id_active_user }, "Vínculo", "eliminación de vínculo");
        console.log("VíNCULO ELIMINADO");

        return new Response(JSON.stringify({ message: "Vínculo eliminado exitosamente." }), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Vínculo no eliminado."
        }), { status: 404 });
    }
}

export { GET, POST, PATCH, PUT, DELETE };