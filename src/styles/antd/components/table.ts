import { css } from "styled-components";

export const tableStyles = css`
  .ant-table {
    background-color: ${props => props.theme.theme === 'dark' ? '#1a1a1a' : '#fff'} !important;
    color: ${props => props.theme.theme === 'dark' ? '#ffe81f' : 'inherit'} !important;
  }

  .ant-table-thead > tr > th {
    background-color: ${props => props.theme.theme === 'dark' ? '#000' : '#fafafa'} !important;
    color: ${props => props.theme.theme === 'dark' ? '#ffe81f' : 'inherit'} !important;
    border-bottom: 2px solid ${props => props.theme.theme === 'dark' ? '#ffe81f' : '#000000ff'} !important;
    font-weight: bold;
  }

  .ant-table-tbody > tr > td {
    background-color: ${props => props.theme.theme === 'dark' ? '#1a1a1a' : '#fff'} !important;
    color: ${props => props.theme.theme === 'dark' ? '#ffe81f' : 'inherit'} !important;
    border-bottom: 1px solid ${props => props.theme.theme === 'dark' ? '#333' : '#f0f0f0'} !important;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: ${props => props.theme.theme === 'dark' ? '#2a2a2a' : '#fafafa'} !important;
  }

  .ant-pagination-item {
    background-color: ${props => props.theme.theme === 'dark' ? '#1a1a1a' : '#fff'} !important;
    border-color: ${props => props.theme.theme === 'dark' ? '#ffe81f' : '#000000ff'} !important;
  }

  .ant-pagination-item a {
    color: ${props => props.theme.theme === 'dark' ? '#ffe81f' : '#000000ff'} !important;
  }

  .ant-pagination-item-active {
    background-color: ${props => props.theme.theme === 'dark' ? '#ffe81f' : '#000000ff'} !important;
    border-color: ${props => props.theme.theme === 'dark' ? '#ffe81f' : '#000000ff'} !important;
  }

  .ant-pagination-item-active a {
    color: ${props => props.theme.theme === 'dark' ? '#000000' : '#ffffffff'} !important;
  }

  .ant-pagination-prev button,
  .ant-pagination-next button {
    color: ${props => props.theme.theme === 'dark' ? '#ffe81f' : '#000000ff'} !important;
  }
`;
