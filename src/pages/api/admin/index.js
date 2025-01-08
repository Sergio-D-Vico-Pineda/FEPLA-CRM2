import prisma from "@db/index.js";

async function GET() {
    return new Response("Example API", { status: 200 });
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

        newProf.message = "Profesor creado exitosamente.";

        return new Response(JSON.stringify(
            newProf
        ), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 404 });
    }

}

export async function PATCH({ request }) {
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
        return new Response(error, { status: 404 });
    }
}

export { GET, POST, PATCH };