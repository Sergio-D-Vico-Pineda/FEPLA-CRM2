const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, DATABASE_URL } = import.meta.env;

export default function getEnv() {

    /* if (!TURSO_DATABASE_URL) {
        throw new Error('Environment variable TURSO_DATABASE_URL is not defined.');
    }

    if (!TURSO_AUTH_TOKEN) {
        throw new Error('Environment variable TURSO_AUTH_TOKEN is not defined.');
    }

    if (!DATABASE_URL) {
        throw new Error('Environment variable DATABASE_URL is not defined.');
    } */

    return { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, DATABASE_URL };
}
