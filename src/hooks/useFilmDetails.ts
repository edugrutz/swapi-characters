import { useQuery } from "@tanstack/react-query";
import type { Film } from "../types/resources";

interface FilmDetailsResult {
    characters: Array<{ name: string; url: string }>;
    planets: Array<{ name: string; url: string }>;
    starships: Array<{ name: string; url: string }>;
    vehicles: Array<{ name: string; url: string }>;
    species: Array<{ name: string; url: string }>;
    isLoading: boolean;
}

export function useFilmDetails(film: Film | null | undefined): FilmDetailsResult {
    const { data: characters = [], isLoading: isLoadingCharacters } = useQuery({
        queryKey: ["film-characters", film?.url],
        queryFn: async () => {
            if (!film?.characters || film.characters.length === 0) return [];
            const responses = await Promise.all(
                film.characters.map((url) => fetch(url).then((res) => res.json()))
            );
            return responses.map((data) => ({ name: data.name, url: data.url }));
        },
        enabled: !!film && film.characters.length > 0,
    });

    const { data: planets = [], isLoading: isLoadingPlanets } = useQuery({
        queryKey: ["film-planets", film?.url],
        queryFn: async () => {
            if (!film?.planets || film.planets.length === 0) return [];
            const responses = await Promise.all(
                film.planets.map((url) => fetch(url).then((res) => res.json()))
            );
            return responses.map((data) => ({ name: data.name, url: data.url }));
        },
        enabled: !!film && film.planets.length > 0,
    });

    const { data: starships = [], isLoading: isLoadingStarships } = useQuery({
        queryKey: ["film-starships", film?.url],
        queryFn: async () => {
            if (!film?.starships || film.starships.length === 0) return [];
            const responses = await Promise.all(
                film.starships.map((url) => fetch(url).then((res) => res.json()))
            );
            return responses.map((data) => ({ name: data.name, url: data.url }));
        },
        enabled: !!film && film.starships.length > 0,
    });

    const { data: vehicles = [], isLoading: isLoadingVehicles } = useQuery({
        queryKey: ["film-vehicles", film?.url],
        queryFn: async () => {
            if (!film?.vehicles || film.vehicles.length === 0) return [];
            const responses = await Promise.all(
                film.vehicles.map((url) => fetch(url).then((res) => res.json()))
            );
            return responses.map((data) => ({ name: data.name, url: data.url }));
        },
        enabled: !!film && film.vehicles.length > 0,
    });

    const { data: species = [], isLoading: isLoadingSpecies } = useQuery({
        queryKey: ["film-species", film?.url],
        queryFn: async () => {
            if (!film?.species || film.species.length === 0) return [];
            const responses = await Promise.all(
                film.species.map((url) => fetch(url).then((res) => res.json()))
            );
            return responses.map((data) => ({ name: data.name, url: data.url }));
        },
        enabled: !!film && film.species.length > 0,
    });

    return {
        characters,
        planets,
        starships,
        vehicles,
        species,
        isLoading: isLoadingCharacters || isLoadingPlanets || isLoadingStarships || isLoadingVehicles || isLoadingSpecies,
    };
}
