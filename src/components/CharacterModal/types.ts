import type { Character } from "../../types/character";

export interface CharacterModalProps {
    character: Character | null;
    open: boolean;
    onClose: () => void;
}