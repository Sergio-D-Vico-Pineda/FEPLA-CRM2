import prisma from "@db/index.js";

async function GET() {
    return new Response("Api to login into the app", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();
    console.log(data);
    const user = await prisma.usuario.findFirst({
        select: {
            usuario: true,
            email: true,
            contrasena: true,
            rol: true,
            id_profesor: true
        },
        where: {
            OR: [
                { email: data.emailusuario },
                { usuario: data.emailusuario },
            ],
            contrasena: data.password
        }
    });
    console.log(user);

    if (user == null) {
        return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
}

export { GET, POST };