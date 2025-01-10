import prisma from "@db/index.js";
import createRegistro from "../utils";

async function GET() {
    return new Response("Admin API", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();

    try {
        const newProf = await prisma.profesor.create({
            data: {
                nombre: data.nombre,
                apellidos: data.apellidos == "" ? null : data.apellidos,
                telefono: data.telefono == "" ? null : data.telefono,
                nif: data.nif == "" ? null : data.nif,
                nip: data.nip == "" ? null : data.nip,
                comentarios: data.comentarios == "" ? null : data.comentarios,
                usuario: {
                    create: {
                        usuario: data.usuario,
                        email: data.email,
                        contrasena: data.contrasena
                    }
                }
            }
        })

        const log = await createRegistro(prisma, { id_entidad: newProf.id_profesor, id_profesor: data.id_active_user }, "Profesor", "creación de profesor");

        newProf.message = "Profesor creado exitosamente.";

        return new Response(JSON.stringify(
            newProf
        ), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Profesor no creado."
        }), { status: 404 });
    }
}

async function PATCH({ request }) {
    const data = await request.json();

    try {
        const newProf = await prisma.profesor.update({
            where: {
                id_profesor: data.id_profesor
            },
            data: {
                nombre: data.nombre,
                apellidos: data.apellidos == "" ? null : data.apellidos,
                telefono: data.telefono == "" ? null : data.telefono,
                nif: data.nif == "" ? null : data.nif,
                nip: data.nip == "" ? null : data.nip,
                comentarios: data.comentarios == "" ? null : data.comentarios,
                usuario: {
                    update: {
                        usuario: data.usuario,
                        email: data.email,
                        contrasena: data.contrasena
                    }
                }
            }
        })

        newProf.message = "Profesor actualizado exitosamente.";

        return new Response(JSON.stringify(
            newProf
        ), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify(error), { status: 404 });
    }
}

async function PUT({ request }) {
    const data = await request.json();

    if (data.id_profesor == null || data.id_profesor == 0) {
        return new Response(JSON.stringify({
            message: "Profesor no actualizado."
        }), { status: 404 });
    }

    try {
        const newProf = await prisma.usuario.update({
            where: {
                id_profesor: data.id_profesor
            },
            data: {
                activo: data.activo
            }
        })

        return new Response(JSON.stringify(
            {
                message: data.activo ? "Profesor activado." : "Profesor desactivado."
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
            message: "Profesor no actualizado."
        }), { status: 404 });
    }
}

export { GET, POST, PATCH, PUT };