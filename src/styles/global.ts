import { createGlobalStyle, keyframes } from "styled-components";
import { antdStyles } from "./antd/antd";

const moveStars = keyframes`
    from { transform: translateY(0); }
    to { transform: translateY(-1000px); }
`;

export const GlobalStyles = createGlobalStyle`
    ${antdStyles}

    body {
        margin: 0;
        min-height: 100vh;
        background-color: ${props => props.theme.theme === 'dark' ? '#000' : '#f5f5f5'};
        position: relative;
        overflow-x: hidden;
        transition: background-color 0.3s ease;
    }

    body::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 200%;
        background: transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat;
        animation: ${moveStars} 100s linear infinite;
        opacity: ${props => props.theme.theme === 'dark' ? '0.4' : '0.1'};
        z-index: -1;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }
    
    .app-layout {
        background: transparent !important;
        padding: 36px;
        min-height: 100vh;
    }
    
    @media (max-width: 768px) {
        .app-layout {
            padding: 12px;
        }
    }
`;
