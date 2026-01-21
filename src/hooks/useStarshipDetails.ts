import { useQuery } from "@tanstack/react-query";
import type { Starship } from "../types/resources";

interface StarshipDetailsResult {
    pilots: Array<{ name: string; url: string }>;
    films: Array<{ title: string; url: string }>;
    isLoading: boolean;
}

export function useStarshipDetails(starship: Starship | null | undefined): StarshipDetailsResult {
    const { data: pilots = [], isLoading: isLoadingPilots } = useQuery({
        queryKey: ["starship-pilots", starship?.url],
        queryFn: async () => {
            if (!starship?.pilots || starship.pilots.length === 0) return [];
            const responses = await Promise.all(
                starship.pilots.map((url) => fetch(url).then((res) => res.json()))
            );
            return responses.map((data) => ({ name: data.name, url: data.url }));
        },
        enabled: !!starship && starship.pilots.length > 0,
    });

    const { data: films = [], isLoading: isLoadingFilms } = useQuery({
        queryKey: ["starship-films", starship?.url],
        queryFn: async () => {
            if (!starship?.films || starship.films.length === 0) return [];
            const responses = await Promise.all(
                starship.films.map((url) => fetch(url).then((res) => res.json()))
            );
            return responses.map((data) => ({ title: data.title, url: data.url }));
        },
        enabled: !!starship && starship.films.length > 0,
    });

    return {
        pilots,
        films,
        isLoading: isLoadingPilots || isLoadingFilms,
    };
}
