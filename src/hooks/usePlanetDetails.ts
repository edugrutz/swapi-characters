import { useQuery } from "@tanstack/react-query";
import type { Planet } from "../types/resources";

interface PlanetDetailsResult {
    residents: Array<{ name: string; url: string }>;
    films: Array<{ title: string; url: string }>;
    isLoading: boolean;
}

export function usePlanetDetails(planet: Planet | null | undefined): PlanetDetailsResult {
    const { data: residents = [], isLoading: isLoadingResidents } = useQuery({
        queryKey: ["planet-residents", planet?.url],
        queryFn: async () => {
            if (!planet?.residents || planet.residents.length === 0) return [];
            const responses = await Promise.all(
                planet.residents.map((url) => fetch(url).then((res) => res.json()))
            );
            return responses.map((data) => ({ name: data.name, url: data.url }));
        },
        enabled: !!planet && planet.residents.length > 0,
    });

    const { data: films = [], isLoading: isLoadingFilms } = useQuery({
        queryKey: ["planet-films", planet?.url],
        queryFn: async () => {
            if (!planet?.films || planet.films.length === 0) return [];
            const responses = await Promise.all(
                planet.films.map((url) => fetch(url).then((res) => res.json()))
            );
            return responses.map((data) => ({ title: data.title, url: data.url }));
        },
        enabled: !!planet && planet.films.length > 0,
    });

    return {
        residents,
        films,
        isLoading: isLoadingResidents || isLoadingFilms,
    };
}
