import { Typography } from 'antd';
import logo from '../../assets/images/logo.png';

const { Title } = Typography;

export function Header() {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '2rem',
            padding: '1rem 0'
        }}>
            <img
                src={logo}
                alt="Star Wars Logo"
                style={{
                    height: '80px',
                    width: 'auto'
                }}
            />
            <Title
                level={1}
                style={{
                    margin: 0,
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    backgroundClip: 'text',
                }}
            >
                Star Wars Characters
            </Title>
        </header>
    );
}
