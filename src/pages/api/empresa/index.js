import prisma from "@db/index.js";

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

        const log = await prisma.registro.create({
            data: {
                descripcion: "creación de empresa",
                entidad: "Empresa",
                id_entidad: newEmpr.id_empresa,
                id_profesor: data.id_active_user
            }
        })

        console.log(log);
        newEmpr.message = "Empresa creada exitosamente.";

        return new Response(JSON.stringify(
            newEmpr
        ), { status: 200 });

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Empresa no creado."
        }), { status: 404 });
    }
}

async function PATCH({ request }) {
    const data = await request.json();
    console.log(data)

    if (data.id_empresa == null) {
        return new Response(JSON.stringify({
            message: "Empresa no actualizada."
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

        return new Response(JSON.stringify(
            {
                message: "Empresa actualizada exitosamente."
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

export { GET, POST, PATCH, PUT };