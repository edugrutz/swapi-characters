import { css } from "styled-components";

export const modalStyles = css`
.ant-modal-content {
        background-color: ${props => props.theme.theme === 'dark' ? '#1a1a1a' : '#fff'} !important;
        border: 1px solid #FFE81F !important;
    }

    .ant-modal-header {
        background-color: transparent !important;
    }

    .ant-modal-title {
        color: ${props => props.theme.theme === 'dark' ? '#ffffffff' : 'inherit'} !important;
    }

    .ant-descriptions-item-label {
        background-color: ${props => props.theme.theme === 'dark' ? '#000' : '#fafafa'} !important;
        color: ${props => props.theme.theme === 'dark' ? '#ffffffff' : 'inherit'} !important;
        font-weight: bold !important;
        border-color: ${props => props.theme.theme === 'dark' ? '#333' : '#f0f0f0'} !important;
    }

    .ant-descriptions-item-content {
        background-color: ${props => props.theme.theme === 'dark' ? '#1a1a1a' : '#fff'} !important;
        color: ${props => props.theme.theme === 'dark' ? '#FFE81F' : 'inherit'} !important;
        border-color: ${props => props.theme.theme === 'dark' ? '#333' : '#f0f0f0'} !important;
    }

    .ant-modal-close {
        color: #FFE81F !important;
    }

    .ant-divider-horizontal {
        border-top-color: #333 !important;
    }
`;