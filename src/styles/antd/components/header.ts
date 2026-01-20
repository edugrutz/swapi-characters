import styled from "styled-components";
import { Typography } from "antd";

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
`;

export const ResponsiveText = styled(Text)`
  color: #ffe81f !important;
  font-size: clamp(0.85rem, 3vw, 1rem) !important;
  opacity: 0.8;
  max-width: 600px;
`;
