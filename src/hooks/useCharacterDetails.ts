import { useQueries } from "@tanstack/react-query";
import { fetchFromUrl } from "../services/swapi";
import type { Character } from "../types/character";
import type { Film, Species, Vehicle, Starship } from "../types/characterDetails";

export function useCharacterDetails(character: Character | null) {
    const filmQueries = useQueries({
        queries: (character?.films || []).map((url) => ({
            queryKey: ["film", url],
            queryFn: () => fetchFromUrl<Film>(url),
            staleTime: 24 * 60 * 60 * 1000,
        })),
    });

    const speciesQueries = useQueries({
        queries: (character?.species || []).map((url) => ({
            queryKey: ["species", url],
            queryFn: () => fetchFromUrl<Species>(url),
            staleTime: 24 * 60 * 60 * 1000,
        })),
    });

    const vehicleQueries = useQueries({
        queries: (character?.vehicles || []).map((url) => ({
            queryKey: ["vehicle", url],
            queryFn: () => fetchFromUrl<Vehicle>(url),
            staleTime: 24 * 60 * 60 * 1000,
        })),
    });

    const starshipQueries = useQueries({
        queries: (character?.starships || []).map((url) => ({
            queryKey: ["starship", url],
            queryFn: () => fetchFromUrl<Starship>(url),
            staleTime: 24 * 60 * 60 * 1000,
        })),
    });

    const isLoading =
        filmQueries.some((q) => q.isLoading) ||
        speciesQueries.some((q) => q.isLoading) ||
        vehicleQueries.some((q) => q.isLoading) ||
        starshipQueries.some((q) => q.isLoading);

    return {
        films: filmQueries.map((q) => q.data).filter(Boolean) as Film[],
        species: speciesQueries.map((q) => q.data).filter(Boolean) as Species[],
        vehicles: vehicleQueries.map((q) => q.data).filter(Boolean) as Vehicle[],
        starships: starshipQueries.map((q) => q.data).filter(Boolean) as Starship[],
        isLoading,
    };
}
