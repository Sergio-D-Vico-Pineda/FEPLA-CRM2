import prisma from "@db/index.js";
import createRegistro from "@utils";

async function GET() {
    return new Response("Example API", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();

    try {

        const newCont = await prisma.contacto.create({
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                telefono: data.telefono,
                comentarios: data.comentarios
            }
        })

        const log = await createRegistro(prisma, { id_entidad: newCont.id_contacto, id_profesor: data.id_active_user }, "Contacto", "creación de contacto");
        console.log(log);
        newCont.message = "Contacto creado exitosamente.";

        return new Response(JSON.stringify(newCont), { status: 200 });
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT") {
            return new Response(JSON.stringify({ message: "Contacto no creado (Email o nombre duplicado)." }), { status: 400 });
        } else {
            console.log(error)
            return new Response(JSON.stringify({
                message: "Contacto no creado."
            }), { status: 404 });
        }
    }
}

async function PATCH({ request }) {
    const data = await request.json();

    try {
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "User not found"
        }), { status: 404 });
    }
}

export { GET, POST, PATCH };