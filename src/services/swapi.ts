import type { Character } from "../types/character";
import type { FetchCharactersParams, PaginatedResponse } from "../types/api";

const SWAPI_BASE_URL = "https://swapi.py4e.com/api";

/**
 * Fetches characters from SWAPI API
 * @param params - Object containing page number and optional search term
 * @returns Promise with paginated character data
 */
export async function fetchCharacters(
	params: FetchCharactersParams = {},
): Promise<PaginatedResponse<Character>> {
	const { page = 1, search = "" } = params;

	const url = new URL(`${SWAPI_BASE_URL}/people/`);
	url.searchParams.append("page", page.toString());

	if (search) {
		url.searchParams.append("search", search);
	}

	const response = await fetch(url.toString());

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response.json();
}

/**
 * Fetches a single resource from a specific SWAPI URL
 * @param url - The full SWAPI URL
 * @returns Promise with the resource data
 */
export async function fetchFromUrl<T>(url: string): Promise<T> {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response.json();
}
