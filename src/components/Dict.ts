
export default function Dict(texto: string): string {

    interface MyObject {
        [key: string]: string;
    }

    let textCapital = texto[0].toUpperCase() + texto.slice(1);

    const dict: MyObject = {
        cif: "CIF",
        confirmar_contraseña: "Confirmar contraseña",
        descripcion: "Descripción",
        direccion: "Dirección",
        fecha_actualizacion: "Fecha de actualización",
        fecha_creacion: "Fecha de creación",
        fecha_fin: "Fecha de fin",
        fecha_inicio: "Fecha de inicio",
        fecha_interaccion: "Fecha de interacción",
        fecha_nacimiento: "Fecha de nacimiento",
        nia: "NIA",
        nif: "NIF",
        nip: "NIP",
        nuss: "NUSS",
        nombre_empresarial: "Nombre empresarial",
        nombre_oficial: "Nombre empresarial",
        sitio_web: "Sitio web",
        tecnologias: "Tecnologías",
        telefono: "Teléfono",
    };
    
    if (dict[texto]) textCapital = dict[texto];

    return textCapital;

}