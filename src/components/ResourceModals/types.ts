export interface FilmModalProps {
    filmId: string | null;
    open: boolean;
    onClose: () => void;
}

export interface SpeciesModalProps {
    speciesId: string | null;
    open: boolean;
    onClose: () => void;
}

export interface VehicleModalProps {
    vehicleId: string | null;
    open: boolean;
    onClose: () => void;
}

export interface StarshipModalProps {
    starshipId: string | null;
    open: boolean;
    onClose: () => void;
}
