import prisma from "@db/index.js";

async function POST({ request }) {
    const data = await request.json();
    // Comprobar si se han seleccionado campos
    /* const keys = Object.keys(data).filter(key => key !== "id_active_user");
    const allFalse = keys.every(key => !data[key]);
    if (allFalse) {
        return new Response(JSON.stringify({
            message: "No se ha seleccionado ningún campo para exportar.",
        }), { status: 400 });
    } */
    
    try {
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

        const columnas = [
            { key: "nombre", label: "nombre" },
            { key: "nombre_empresarial", label: "nombre_empresarial" },
            { key: "direccion", label: "direccion" },
            { key: "cif", label: "cif" },
            { key: "sitio_web", label: "sitio_web" },
            { key: "sector", label: "sector" },
            { key: "tecnologias", label: "tecnologias" },
            { key: "comentarios", label: "comentarios" },
            { key: "activo", label: "activo" },
            { key: "fecha_creacion", label: "fecha_creacion" },
            { key: "fecha_actualizacion", label: "fecha_actualizacion" },
        ];

        // Filtrar columnas activas según los valores de `data`
        const columnasActivas = columnas.filter(col => data[col.key]);

        // Generar el CSV
        const csv = [
            // Generar la cabecera (nombres de las columnas activas)
            columnasActivas.map(col => col.label).join(";"),
            // Generar las filas con los datos de las empresas
            ...empresas.map(empresa =>
                columnasActivas.map(col => {
                    const valor = empresa[col.key];

                    // Asegurar que `false` y `0` se representen correctamente
                    if (valor === false) return "false";
                    if (valor === 0) return "0";

                    // Si el valor es una fecha, convertirla a ISO
                    if (valor instanceof Date) return valor.toISOString();

                    // Retornar el valor o vacío si es null/undefined
                    return valor || "";
                }).join(";")
            )
        ].join("\n");

        return new Response(csv, {
            headers: {
                "Content-Disposition": "attachment; filename=empresas.csv",
                "Content-Type": "text/csv",
            }
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            message: "Error al exportar."
        }), { status: 404 });
    }
};

export { POST };