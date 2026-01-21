import { Routes, Route } from "react-router-dom";
import { CharacterGrid } from "../components/CharacterGrid";
import { CharacterProfile } from "../components/CharacterProfile";
import { PlanetDetail } from "../components/PlanetDetail";
import { FilmDetail } from "../components/FilmDetail";
import { VehicleDetail } from "../components/VehicleDetail";
import { StarshipDetail } from "../components/StarshipDetail";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<CharacterGrid />} />
            <Route path="/character/:name" element={<CharacterProfile />} />
            <Route path="/planet/:id" element={<PlanetDetail />} />
            <Route path="/film/:id" element={<FilmDetail />} />
            <Route path="/vehicle/:id" element={<VehicleDetail />} />
            <Route path="/starship/:id" element={<StarshipDetail />} />
        </Routes>
    );
}