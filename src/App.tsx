import { Layout } from 'antd'
import { CharacterTable } from './components/CharacterTable'
import { Header } from './components/Header'
import './App.css'

const { Content } = Layout

function App() {

  return (
    <>
      <Layout className="app-layout">
        <Header />
        <Content>
          <CharacterTable />
        </Content>
      </Layout>
    </>
  )
}

export default App
