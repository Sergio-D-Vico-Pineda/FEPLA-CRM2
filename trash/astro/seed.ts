/* import {
	db, Instituto, Grupo, Curso, Alumno, Inscripcion, Profesor, ProfesorInstituto,
	Usuario, Empresa, Practica, Contacto, ContactoEmpresa, Interaccion, Registro
} from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {

	await db.insert(Instituto).values([
		{ nombre: 'IES El Pla' }
	])

	await db.insert(Grupo).values([
		{ nombre: '1 DAW', id_instituto: 1 },
		{ nombre: '2 DAW', id_instituto: 1 },
		{ nombre: '1 DAM', id_instituto: 1 },
		{ nombre: '2 DAM', id_instituto: 1 },
		{ nombre: '1 ASIR', id_instituto: 1 },
		{ nombre: '2 ASIR', id_instituto: 1 },
	])

	await db.insert(Curso).values([
		{ anio_academico: '2022/2023' },
		{ anio_academico: '2023/2024' },
		{ anio_academico: '2024/2025' },
		{ anio_academico: '2025/2026' },
	])

}
 */