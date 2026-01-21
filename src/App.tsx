import { Layout } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CharacterTable } from "./components/CharacterTable";
import { CharacterProfile } from "./components/CharacterProfile";
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
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
