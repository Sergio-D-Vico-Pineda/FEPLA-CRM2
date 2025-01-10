const createRegistro = async (prisma, data, entidad, descripcion) => {
    const log = await prisma.registro.create({
        data: {
            descripcion,
            entidad,
            id_entidad: data.id_entidad,
            id_profesor: data.id_profesor
        }
    });
    return log;
}

export default createRegistro;