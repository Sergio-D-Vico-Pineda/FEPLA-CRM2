import prisma from "@db/index.js";
import createRegistro from "@utils";

async function GET() {
    return new Response("Profesor API", { status: 200 });
}

async function PATCH({ request }) {
    const data = await request.json();

    console.log(data)

    try {

        const prof = await prisma.profesor.update({
            where: {
                id_profesor: data.id_profesor
            },
            data: {
                nombre: data.nombre,
                apellidos: data.apellidos,
                telefono: data.telefono,
                nif: data.nif,
                nip: data.nip,
                usuario: {
                    update: {
                        usuario: data.usuario,
                        email: data.email,
                        contrasena: data.contrasena
                    }
                }
            }
        })

        const log = await createRegistro(prisma, { id_entidad: data.id_profesor, id_profesor: data.id_active_user }, "Profesor", "actualización de perfil de un profesor");

        return new Response(JSON.stringify({ message: "Perfil actualizado exitosamente." }), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "Perfil no actualizado"
        }), { status: 404 });
    }
}

export { GET, PATCH };