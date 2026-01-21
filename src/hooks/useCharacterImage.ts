import { useQuery } from "@tanstack/react-query";
import { getCharacterImagesMap } from "../services/starwarsImages";

export function useCharacterImage(characterName: string | null | undefined) {
    const { data: imagesMap, isLoading } = useQuery({
        queryKey: ["character-images"],
        queryFn: getCharacterImagesMap,
        staleTime: Infinity, // Cache forever since images don't change
    });

    const imageUrl = characterName && imagesMap ? imagesMap[characterName] : undefined;

    return {
        imageUrl,
        isLoading,
    };
}
