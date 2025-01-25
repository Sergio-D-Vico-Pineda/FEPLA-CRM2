import prisma from "@db/index.js";

async function POST({ request }) {
    const data = await request.json();

    try {
        // 1. Filtrar campos a incluir
        const selectFields = Object.fromEntries(
            Object.entries(data).filter(([key, value]) =>
                value === true && key !== 'id_active_user'
            )
        );

        // 2. Obtener datos
        const alumnos = await prisma.alumno.findMany({
            select: selectFields
        });

        // 3. Generar CSV
        const csvContent = [
            Object.keys(selectFields).join(';'),
            ...alumnos.map(alumno =>
                Object.entries(alumno).map(([key, value]) => {
                    // Aplicar formato ISO solo a campos de fecha
                    if (value instanceof Date) {
                        return value.toISOString();
                    }
                    return value !== null && value !== undefined ? value.toString() : '';
                }).join(';')
            )
        ].join('\n');

        return new Response(csvContent, {
            headers: {
                'Content-Disposition': 'attachment; filename=alumnos.csv',
                'Content-Type': 'text/csv; charset=utf-8',
            }
        });

    } catch (error) {
        console.error('Error en exportación:', error);
        return new Response(JSON.stringify({ message: "Error al exportar: " + error.message }), { status: 500 });
    }
};

export { POST };