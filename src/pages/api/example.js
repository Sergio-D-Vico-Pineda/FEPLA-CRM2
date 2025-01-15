import prisma from "@db/index.js";

async function GET() {
    return new Response("Example API", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();
    const user = await prisma.usuario.findFirst();
    console.log(user);

    try {
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "User not found"
        }), { status: 404 });
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

async function PUT({ request }) {
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

export { GET, POST, PATCH, PUT };