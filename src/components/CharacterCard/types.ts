import type { Character } from "../../types/character";
import type { ReactNode } from "react";

export interface CharacterCardProps {
    character: Character;
    onClick: (character: Character) => void;
    getGenderIcon: (gender: string) => ReactNode;
}