import { useQuery } from "@tanstack/react-query";
import type { Vehicle } from "../types/resources";

interface VehicleDetailsResult {
    pilots: Array<{ name: string; url: string }>;
    films: Array<{ title: string; url: string }>;
    isLoading: boolean;
}

export function useVehicleDetails(vehicle: Vehicle | null | undefined): VehicleDetailsResult {
    const { data: pilots = [], isLoading: isLoadingPilots } = useQuery({
        queryKey: ["vehicle-pilots", vehicle?.url],
        queryFn: async () => {
            if (!vehicle?.pilots || vehicle.pilots.length === 0) return [];
            const responses = await Promise.all(
                vehicle.pilots.map((url) => fetch(url).then((res) => res.json()))
            );
            return responses.map((data) => ({ name: data.name, url: data.url }));
        },
        enabled: !!vehicle && vehicle.pilots.length > 0,
    });

    const { data: films = [], isLoading: isLoadingFilms } = useQuery({
        queryKey: ["vehicle-films", vehicle?.url],
        queryFn: async () => {
            if (!vehicle?.films || vehicle.films.length === 0) return [];
            const responses = await Promise.all(
                vehicle.films.map((url) => fetch(url).then((res) => res.json()))
            );
            return responses.map((data) => ({ title: data.title, url: data.url }));
        },
        enabled: !!vehicle && vehicle.films.length > 0,
    });

    return {
        pilots,
        films,
        isLoading: isLoadingPilots || isLoadingFilms,
    };
}
