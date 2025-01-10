import prisma from "@db/index.js";

async function GET() {
    return new Response("Example API", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();
    const user = await prisma.usuario.findFirst();
    console.log(user);

    if (user == null) {
        return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
}

async function PATCH({ request }) {
    const data = await request.json();

    return new Response(JSON.stringify(data), { status: 200 });
}

async function PUT({ request }) {
    const data = await request.json();
    return new Response(JSON.stringify(data), { status: 200 });
}

export { GET, POST, PATCH, PUT };