import prisma from "@db/index.js";

async function GET() {
    return new Response("Api to login into the app", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();
    const user = await prisma.usuario.findFirst({
        select: {
            id_usuario: true,
            usuario: true,
            email: true,
            rol: true,
            id_profesor: true
        },
        where: {
            OR: [
                { email: data.emailusuario },
                { usuario: data.emailusuario },
            ],
            contrasena: data.password,
            activo: true
        }
    });
    console.log(user);

    if (user == null) {
        return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
}

export { GET, POST };