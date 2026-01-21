import styled from "styled-components";
import { Typography, Button } from "antd";

const { Title, Text } = Typography;

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
`;

export const ContentSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ResponsiveTitle = styled(Title)`
  margin: 0 !important;
  font-size: clamp(1.8rem, 6vw, 2.5rem) !important;
  font-weight: bold !important;
  line-height: 1.2 !important;
  color: ${props => props.theme.theme === 'dark' ? '#fff' : '#000'} !important;
`;

export const ResponsiveText = styled(Text)`
  color: ${props => props.theme.theme === 'dark' ? '#ffe81f' : '#000000ff'} !important;
  font-size: clamp(0.85rem, 3vw, 1rem) !important;
  opacity: ${props => props.theme.theme === 'dark' ? '0.8' : '1'};
  max-width: 600px;
`;

export const LogoImage = styled.img`
  height: clamp(60px, 10vw, 80px);
  width: auto;
`;

export const SettingsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
`;

export const ThemeToggleButton = styled(Button)`
  font-size: 1.2rem !important;
  color: ${props => props.theme.theme === 'dark' ? '#fff' : '#000'} !important;
  border: 1px solid ${props => props.theme.theme === 'dark' ? '#fff' : '#000'} !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  
  &:hover {
    color: ${props => props.theme.theme === 'dark' ? '#ffe81f' : '#1890ff'} !important;
    border-color: ${props => props.theme.theme === 'dark' ? '#ffe81f' : '#1890ff'} !important;
  }
`;
