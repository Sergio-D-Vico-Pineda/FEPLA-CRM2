import prisma from "@db/index.js";

async function POST({ request }) {
    const data = await request.json();

    try {
        // 1. Filtrar campos usando filter y Object.fromEntries
        const selectFields = Object.fromEntries(
            Object.entries(data).filter(([key, value]) =>
                value === true && key !== 'id_active_user'
            )
        );

        // 2. Obtener datos desde Prisma
        const empresas = await prisma.empresa.findMany({
            select: selectFields
        });

        // 3. Generar CSV
        const csvContent = [
            Object.keys(selectFields).join(';'),
            ...empresas.map(empresa =>
                Object.entries(empresa).map(([key, value]) => {
                    if (value instanceof Date) return value.toISOString();
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
        return new Response(JSON.stringify({
            message: "Error al exportar: " + error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export { POST };