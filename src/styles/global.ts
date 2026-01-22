import { createGlobalStyle } from "styled-components";
import { antdStyles } from "./antd/antd";

export const GlobalStyles = createGlobalStyle`
    ${antdStyles}

    body {
        margin: 0;
        min-height: 100vh;
        background-color: ${props => props.theme.theme === 'dark' ? '#000' : '#fafafa'};
        position: relative;
        overflow-x: hidden;
        transition: background-color 0.3s ease;
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
