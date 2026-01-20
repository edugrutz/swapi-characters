import { css } from "styled-components";

export const inputStyles = css`
  .ant-input-search .ant-input-affix-wrapper,
  .ant-input-search .ant-input-group-wrapper,
  .ant-input-search .ant-input-wrapper,
  .ant-input-search .ant-input-group {
    background-color: #1a1a1a !important;
    border-color: #ffe81f !important;
  }

  .ant-input-search .ant-input {
    background-color: #1a1a1a !important;
    color: #ffe81f !important;
    border: none !important;
  }

  .ant-input-search-button {
    background-color: #ffe81f !important;
    border-color: #ffe81f !important;
    color: #000000 !important;
  }

  .ant-input-search-button:hover {
    background-color: #ffc500 !important;
    border-color: #ffc500 !important;
    color: #000000 !important;
  }

  .ant-input-search-button .anticon {
    color: #000000 !important;
  }

  .ant-input-search .ant-input-group-addon {
    background-color: transparent !important;
    border: none !important;
  }

  .ant-input::placeholder {
    color: #999999 !important;
  }
`;
