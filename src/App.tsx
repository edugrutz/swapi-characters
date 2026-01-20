import { Layout, Typography } from 'antd'
import { CharacterTable } from './components/CharacterTable'

const { Content } = Layout

function App() {

  return (
    <>
      <Layout>
        <Typography.Title>Star Wars Characters</Typography.Title>
        <Content>
          <CharacterTable />
        </Content>
      </Layout>
    </>
  )
}

export default App
