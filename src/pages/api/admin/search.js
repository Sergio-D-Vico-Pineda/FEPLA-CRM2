import prisma from "@db/index.js";

async function GET() {
    return new Response("Api to search professors", { status: 200 });
}

async function POST({ request }) {
    const data = await request.json();

    if (data.svalue == null || data.svalue == "") {
        return new Response(JSON.stringify({ message: "User not found"}), { status: 404 });
    }

    if (data.svalue == "admin") {
        return new Response(JSON.stringify({ message: "Admin cannot be edited"}), { status: 404 });
    }

    const user = await prisma.usuario.findFirst({
        select: {
            id_profesor: true
        },
        where: {
            OR: [
                { email: data.svalue },
                { usuario: data.svalue },
            ]
        }
    });

    if (user == null) {
        return new Response(JSON.stringify({ message: "User not found"}), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
}

export { GET, POST };
