const IMAGES_API_BASE_URL = "https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api";

export interface StarWarsApiCharacter {
    id: number;
    name: string;
    image: string;
}

let characterImagesMap: Record<string, string> | null = null;

export async function getCharacterImagesMap(): Promise<Record<string, string>> {
    if (characterImagesMap) return characterImagesMap;

    try {
        const response = await fetch(`${IMAGES_API_BASE_URL}/all.json`);
        if (!response.ok) throw new Error("Failed to fetch character images");

        const data: StarWarsApiCharacter[] = await response.json();

        characterImagesMap = data.reduce((acc, char) => {
            acc[char.name] = char.image;
            return acc;
        }, {} as Record<string, string>);

        return characterImagesMap!;
    } catch (error) {
        console.error("Error fetching character images:", error);
        return {};
    }
}
