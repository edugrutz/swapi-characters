import { css } from "styled-components";

export const alertStyles = css`
  .ant-alert-error {
    background-color: ${props => props.theme.theme === 'dark' ? '#2a1a1a' : '#fff2f0'} !important;
    border-color: #ff4d4f !important;
  }

  .ant-alert-error .ant-alert-message {
    color: #ff7875 !important;
  }

  .ant-alert-error .ant-alert-description {
    color: ${props => props.theme.theme === 'dark' ? '#ffe81f' : 'inherit'} !important;
  }
`;
