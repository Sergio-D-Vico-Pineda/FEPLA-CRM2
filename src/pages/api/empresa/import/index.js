import prisma from "@db/index.js";
import createRegistro from "@utils";

async function GET() {
    const delemp = await prisma.empresa.deleteMany({
        where: {
            fecha_creacion: new Date("2000-01-01T10:00:10.827Z")
        }
    });

    return new Response(JSON.stringify({ message: `${delemp.count} empresas eliminadas.` }), { status: 200 });
}

async function POST({ request }) {
    let counter = 0;
    const data = await request.json();
    const errormsg = { message: "" }

    try {
        console.log(data)
        counter = data.empresas.length
        const empresas = data.empresas;

        for (const empresa of empresas) {
            try {
                const newEmpr = await prisma.empresa.create({
                    data: {
                        nombre: empresa.nombre,
                        nombre_empresarial: empresa.nombre_empresarial,
                        direccion: empresa.direccion,
                        cif: empresa.cif,
                        sitio_web: empresa.sitio_web,
                        sector: empresa.sector,
                        tecnologias: empresa.tecnologias,
                        comentarios: empresa.comentarios,
                        activo: empresa.activo,
                        fecha_creacion: empresa.fecha_creacion == null || empresa.fecha_creacion == "" ? new Date() : new Date(empresa.fecha_creacion),
                    }
                });
            } catch (error) {
                if (error.code === "SQLITE_CONSTRAINT") {
                    console.log("Error creating empresa:", empresa.nombre);
                    errormsg.message += `\nNo se ha podido crear la empresa: ${empresa.nombre}\n`;
                }
                counter--;
                continue;
            }
        }

        const log = await createRegistro(prisma, { id_entidad: 0, id_profesor: data.id_active_user }, "Empresa", "importación de empresas");
        console.log(log);

        if (counter == 0) {
            errormsg.message += "\nNo se han creado empresas."
            return new Response(JSON.stringify(errormsg), { status: 500 });
        }
    } catch (error) {
        console.error("Error in POST:", error);
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify({ message: `${counter} empresas creadas.` }), { status: 201 });
}

export { GET, POST };