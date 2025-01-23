import prisma from "@db/index.js";

async function POST({ request }) {
    const data = request.json();
    console.log(data);
    const empresas = await prisma.empresa.findMany({
        select: {
            nombre: data.nombre,
            nombre_empresarial: data.nombre_empresarial,
            direccion: data.direccion,
            cif: data.cif,
            sitio_web: data.sitio_web,
            sector: data.sector,
            tecnologias: data.tecnologias,
            comentarios: data.comentarios,
            activo: data.activo,
            fecha_creacion: data.fecha_creacion,
            fecha_actualizacion: data.fecha_actualizacion,
        },
    });

    const csv = [
        [
            "id_empresa",
            "nombre",
            "nombre_empresarial",
            "direccion",
            "cif",
            "sitio_web",
            "sector",
            "tecnologias",
            "comentarios",
            "activo",
            "fecha_creacion",
            "fecha_actualizacion",
        ],
        ...empresas.map((empresa) => [
            empresa.id_empresa,
            empresa.nombre,
            empresa.nombre_empresarial,
            empresa.direccion,
            empresa.cif,
            empresa.sitio_web,
            empresa.sector,
            empresa.tecnologias,
            empresa.comentarios,
            empresa.activo,
            empresa.fecha_creacion.toISOString(),
            empresa.fecha_actualizacion?.toISOString(),
        ]),
    ].map((row) => row.join(";")).join("\n");

    return new Response(csv, {
        headers: {
            "Content-Disposition": "attachment; filename=empresas.csv",
            "Content-Type": "text/csv",
        }
    });
};

export { POST };