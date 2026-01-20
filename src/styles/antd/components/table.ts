import { css } from "styled-components";

export const tableStyles = css`
  .ant-table {
    background-color: #1a1a1a !important;
    color: #ffe81f !important;
  }

  .ant-table-thead > tr > th {
    background-color: #000000 !important;
    color: #ffe81f !important;
    border-bottom: 2px solid #ffe81f !important;
    font-weight: bold;
  }

  .ant-table-tbody > tr > td {
    background-color: #1a1a1a !important;
    color: #ffe81f !important;
    border-bottom: 1px solid #333333 !important;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #2a2a2a !important;
  }

  .ant-pagination-item {
    background-color: #1a1a1a !important;
    border-color: #ffe81f !important;
  }

  .ant-pagination-item a {
    color: #ffe81f !important;
  }

  .ant-pagination-item-active {
    background-color: #ffe81f !important;
    border-color: #ffe81f !important;
  }

  .ant-pagination-item-active a {
    color: #000000 !important;
  }

  .ant-pagination-prev button,
  .ant-pagination-next button {
    color: #ffe81f !important;
  }
`;
