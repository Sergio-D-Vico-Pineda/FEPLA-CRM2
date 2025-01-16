import prisma from "@db/index.js";
import createRegistro from "@utils";

async function GET() {
    return new Response("Example API", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();

    try {
        return new Response(JSON.stringify(), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: " * no creado"
        }), { status: 404 });
    }
}

async function PATCH({ request }) {
    const data = await request.json();

    try {
        return new Response(JSON.stringify(), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: "* no actualizado"
        }), { status: 404 });
    }
}

async function PUT({ request }) {
    const data = await request.json();
    try {
        return new Response(JSON.stringify(), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            message: " * no actualizado"
        }), { status: 404 });
    }
}

export { GET, POST, PATCH, PUT };