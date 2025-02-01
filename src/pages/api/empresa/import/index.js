import prisma from "@db/index.js";
import createRegistro from "@utils";

async function POST({ request }) {
    let counter = 0;
    const data = await request.json();

    try {
        console.log(data)
        counter = data.empresas.length
        /* const newEmpr = await prisma.empresa.create({
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
        console.log(log); */

        return new Response(JSON.stringify({ message: `Petición alcanzada. ${counter} empresas creadas` }), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Empresa no creada."
        }), { status: 404 });
    }
}

export { POST };