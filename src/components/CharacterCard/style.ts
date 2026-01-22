import styled from "styled-components";
import { Card } from "antd";

export const StyledCard = styled(Card)`
  background: ${({ theme }) =>
    theme.theme === "dark" ? "rgba(255, 232, 31, 0.05)" : "#ffffff"} !important;
  border: 1px solid ${({ theme }) =>
    theme.theme === "dark" ? "rgba(255, 232, 31, 0.2)" : "#c7c7c7ff"} !important;
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
    theme.theme === "dark" ? "#ffe81f" : "#FFE81F"} !important;
    box-shadow: ${({ theme }) =>
    theme.theme === "dark" ? "0 10px 20px rgba(0, 0, 0, 0.2)" : "0 10px 20px rgba(0, 0, 0, 0.1)"};
  }

  .ant-card-head {
    border-bottom: 1px solid ${({ theme }) =>
    theme.theme === "dark" ? "rgba(255, 232, 31, 0.2)" : "#e8e8e8"};
    color: ${({ theme }) =>
    theme.theme === "dark" ? "#ffe81f" : "#1f1f1f"} !important;
    font-weight: ${({ theme }) =>
    theme.theme === "dark" ? "normal" : "600"};
  }

  .ant-card-body {
    color: ${({ theme }) =>
    theme.theme === "dark" ? "#fff" : "#1f1f1f"} !important;
  }
`;

export const CardLabel = styled.span`
  font-weight: bold;
  margin-right: 8px;
  color: ${({ theme }) =>
    theme.theme === "dark" ? "#ffe81f" : "#1f1f1f"};
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
    theme.theme === "dark" ? "#ffe81f" : "#FFE81F"};
  flex-shrink: 0;
  background: ${({ theme }) =>
    theme.theme === "dark" ? "rgba(255, 232, 31, 0.1)" : "rgba(255, 232, 31, 0.05)"};
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
    theme.theme === "dark" ? "#ffe81f" : "#FFE81F"};
  }
`;
