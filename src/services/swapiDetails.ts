import type { Film, Species, Vehicle, Starship, Planet } from "../types/resources";

const SWAPI_BASE_URL = "https://swapi.dev/api";

export async function fetchFilmById(id: string): Promise<Film> {
    const response = await fetch(`${SWAPI_BASE_URL}/films/${id}/`);
    if (!response.ok) {
        throw new Error(`Failed to fetch film with id ${id}`);
    }
    return response.json();
}

export async function fetchSpeciesById(id: string): Promise<Species> {
    const response = await fetch(`${SWAPI_BASE_URL}/species/${id}/`);
    if (!response.ok) {
        throw new Error(`Failed to fetch species with id ${id}`);
    }
    return response.json();
}

export async function fetchVehicleById(id: string): Promise<Vehicle> {
    const response = await fetch(`${SWAPI_BASE_URL}/vehicles/${id}/`);
    if (!response.ok) {
        throw new Error(`Failed to fetch vehicle with id ${id}`);
    }
    return response.json();
}

export async function fetchStarshipById(id: string): Promise<Starship> {
    const response = await fetch(`${SWAPI_BASE_URL}/starships/${id}/`);
    if (!response.ok) {
        throw new Error(`Failed to fetch starship with id ${id}`);
    }
    return response.json();
}

export async function fetchPlanetById(id: string): Promise<Planet> {
    const response = await fetch(`${SWAPI_BASE_URL}/planets/${id}/`);
    if (!response.ok) {
        throw new Error(`Failed to fetch planet with id ${id}`);
    }
    return response.json();
}
