import { Layout } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CharacterGrid } from "./components/CharacterGrid";
import { CharacterProfile } from "./components/CharacterProfile";
import { PlanetDetail } from "./components/PlanetDetail";
import { FilmDetail } from "./components/FilmDetail";
import { VehicleDetail } from "./components/VehicleDetail";
import { StarshipDetail } from "./components/StarshipDetail";
import { Header } from "./components/Header";
import { GlobalStyles } from "./styles/global";
import { BackgroundStars } from "./components/BackgroundStars";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout className="app-layout">
        <GlobalStyles />
        <BackgroundStars />
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<CharacterGrid />} />
            <Route path="/character/:name" element={<CharacterProfile />} />
            <Route path="/planet/:id" element={<PlanetDetail />} />
            <Route path="/film/:id" element={<FilmDetail />} />
            <Route path="/vehicle/:id" element={<VehicleDetail />} />
            <Route path="/starship/:id" element={<StarshipDetail />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
