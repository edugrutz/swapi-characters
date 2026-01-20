import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "../services/swapi";
import type { FetchCharactersParams } from "../types/api";

/**
 * Custom hook to fetch Star Wars characters using TanStack Query
 * @param params - Object containing page number and optional search term
 * @returns Query result with data, loading, and error states
 */
export function useCharacters(params: FetchCharactersParams) {
  return useQuery({
    queryKey: ["characters", params.page, params.search],
    queryFn: () => fetchCharacters(params),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
  });
}
