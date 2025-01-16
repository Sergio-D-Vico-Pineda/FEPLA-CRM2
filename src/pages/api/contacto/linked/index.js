import prisma from "@db/index.js";
import createRegistro from "@utils";

async function GET() {
    return new Response("Contacto 2 API", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();

    try {
        const newCont = await prisma.contacto.create({
            data: {
                nombre: data.nombre,
                apellidos: data.apellidos,
                email: data.email,
                telefono: data.telefono,
                comentarios: data.comentarios,
                empresas: {
                    create: [
                        {
                            id_empresa: data.id_empresa,
                            puesto: data.puesto,
                        }
                    ]
                }
            }

        })

        const log = await createRegistro(prisma, { id_entidad: newCont.id_contacto, id_profesor: data.id_active_user }, "Contacto", "creación de contacto y vinculación a empresa");
        console.log(log);
        newCont.message = "Contacto vinculado creado exitosamente.";

        return new Response(JSON.stringify(newCont), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: " Contacto vinculado no creado"
        }), { status: 404 });
    }
}

async function PATCH({ request }) {
    const data = await request.json();

    try {
        return new Response(JSON.stringify(), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Contacto vinculado no actualizado"
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
            message: " Contacto vinculado no actualizado"
        }), { status: 404 });
    }
}

export { GET, POST, PATCH, PUT };