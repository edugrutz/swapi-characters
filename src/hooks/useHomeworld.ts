import { useQuery } from "@tanstack/react-query";
import { fetchPlanetById } from "../services/swapiDetails";
import type { Planet } from "../types/resources";

export function useHomeworld(homeworldUrl: string | null) {
    const planetId = homeworldUrl ? homeworldUrl.match(/\/(\d+)\/?$/)?.[1] : null;

    const { data: homeworld, isLoading } = useQuery<Planet>({
        queryKey: ["planet", planetId],
        queryFn: () => fetchPlanetById(planetId!),
        enabled: !!planetId,
    });

    return { homeworld, isLoading };
}
