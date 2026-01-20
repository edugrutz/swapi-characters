import { Layout } from "antd";
import { CharacterTable } from "./components/CharacterTable";
import { Header } from "./components/Header";
import { GlobalStyles } from "./styles/global";

const { Content } = Layout;

function App() {
  return (
    <>
      <Layout className="app-layout">
        <GlobalStyles />
        <Header />
        <Content>
          <CharacterTable />
        </Content>
      </Layout>
    </>
  );
}

export default App;
