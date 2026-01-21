/**
 * Extrai o ID de uma URL da SWAPI
 * @param url - URL completa da SWAPI (ex: "https://swapi.co/api/films/1/")
 * @returns ID extraído (ex: "1")
 */
export function extractId(url: string): string {
    const match = url.match(/\/(\d+)\/?$/);
    return match ? match[1] : "";
}
