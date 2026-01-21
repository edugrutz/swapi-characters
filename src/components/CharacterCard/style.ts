import styled from "styled-components";
import { Card } from "antd";

export const StyledCard = styled(Card)`
  background: ${({ theme }) =>
    theme.theme === "dark" ? "rgba(255, 232, 31, 0.05)" : "rgba(0, 0, 0, 0.02)"} !important;
  border: 1px solid ${({ theme }) =>
    theme.theme === "dark" ? "rgba(255, 232, 31, 0.2)" : "rgba(0, 0, 0, 0.1)"} !important;
  transition: all 0.3s ease !important;
  cursor: pointer;
  height: 100%;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) =>
    theme.theme === "dark" ? "#ffe81f" : "#1890ff"} !important;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .ant-card-head {
    border-bottom: 1px solid ${({ theme }) =>
    theme.theme === "dark" ? "rgba(255, 232, 31, 0.2)" : "rgba(0, 0, 0, 0.1)"};
    color: ${({ theme }) =>
    theme.theme === "dark" ? "#ffe81f" : "inherit"} !important;
  }

  .ant-card-body {
    color: ${({ theme }) =>
    theme.theme === "dark" ? "#fff" : "inherit"} !important;
  }
`;

export const CardLabel = styled.span`
  font-weight: bold;
  margin-right: 8px;
  color: ${({ theme }) =>
    theme.theme === "dark" ? "#ffe81f" : "inherit"};
`;

export const CardContent = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const CardAvatar = styled.div`
  width: 120px;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${({ theme }) =>
    theme.theme === "dark" ? "#ffe81f" : "#1890ff"};
  flex-shrink: 0;
  background: ${({ theme }) =>
    theme.theme === "dark" ? "rgba(255, 232, 31, 0.1)" : "rgba(24, 144, 255, 0.1)"};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .anticon {
    font-size: 40px;
    color: ${({ theme }) =>
    theme.theme === "dark" ? "#ffe81f" : "#1890ff"};
  }
`;
