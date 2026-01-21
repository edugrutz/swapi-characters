import { Layout } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CharacterTable } from "./components/CharacterTable";
import { CharacterProfile } from "./components/CharacterProfile";
import { PlanetDetail } from "./components/PlanetDetail";
import { FilmDetail } from "./components/FilmDetail";
import { VehicleDetail } from "./components/VehicleDetail";
import { Header } from "./components/Header";
import { GlobalStyles } from "./styles/global";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout className="app-layout">
        <GlobalStyles />
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<CharacterTable />} />
            <Route path="/character/:name" element={<CharacterProfile />} />
            <Route path="/planet/:id" element={<PlanetDetail />} />
            <Route path="/film/:id" element={<FilmDetail />} />
            <Route path="/vehicle/:id" element={<VehicleDetail />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
