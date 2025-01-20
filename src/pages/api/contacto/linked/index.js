import prisma from "@db/index.js";
import createRegistro from "@utils";

async function GET() {
    return new Response("Contacto 2 API", { status: 200 });
}

async function POST({ request }) {
    // CREACIÓN Y VINCULACIÓN DE CONTACTO DESDE EMPRESA
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

        const log = await createRegistro(prisma, { id_entidad: newCont.id_contacto, id_profesor: data.id_active_user }, "Contacto", "creación de contacto");
        const log2 = await createRegistro(prisma, { id_entidad: newCont.empresas.id_contacto_empresa, id_profesor: data.id_active_user }, "Vinculo", "Vinculación a empresa");
        console.log(log);
        console.log(log2);
        newCont.message = "Contacto vinculado creado exitosamente.";

        return new Response(JSON.stringify(newCont), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: " Contacto vinculado no creado."
        }), { status: 404 });
    }
}

async function PATCH({ request }) {
    // VINCULACIÓN DE UN CONTACTO EXISTENTE A UNA EMPRESA
    const data = await request.json();

    console.log(data)
    try {
        const vinc = await prisma.contacto_Empresa.create({
            data: {
                id_contacto: data.id_contacto,
                id_empresa: data.id_empresa,
                puesto: data.puesto,
            }
        });

        const log = await createRegistro(prisma, { id_entidad: vinc.id_contacto_empresa, id_profesor: data.id_active_user }, "Vinculo", "vinculación de contacto a empresa");
        console.log(log);

        return new Response(JSON.stringify({ message: "Contacto vinculado creado exitosamente." }), { status: 200 });
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT") {
            return new Response(JSON.stringify({ message: "Contacto vinculado no creado (El contacto ya tiene un vinculo con la empresa seleccionada)." }), { status: 400 });
        }
        console.log(error)
        return new Response(JSON.stringify({ message: "El contacto no se ha podido vincular." }), { status: 404 });
    }
}

async function PUT({ request }) {
    const data = await request.json();
    try {
        return new Response(JSON.stringify(), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: " Contacto vinculado no actualizado." }), { status: 404 });
    }
}

export { GET, POST, PATCH, PUT };