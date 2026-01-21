import { createRoot } from "react-dom/client";
import { Layout } from "antd";
import "antd/dist/reset.css";
import "./i18n.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./contexts/ThemeContext/provider.tsx";
import { Header } from "./components/Header";
import { GlobalStyles } from "./styles/global";
import { BackgroundStars } from "./components/BackgroundStars";
import AppRoutes from "./routes/routes.tsx";
import { BrowserRouter } from "react-router-dom";
const { Content } = Layout;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Layout className="app-layout">
          <BrowserRouter>
            <GlobalStyles />
            <BackgroundStars />
            <Header />
            <Content>
              <AppRoutes />
            </Content>
          </BrowserRouter>
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

export default App;
