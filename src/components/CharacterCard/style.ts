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
