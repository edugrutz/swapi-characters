import { createGlobalStyle } from "styled-components";
import { antdStyles } from "./antd/antd";

export const GlobalStyles = createGlobalStyle`
    ${antdStyles}

    body {
        min-height: 100vh;
        background-color: #000000ff;
        padding: 24px;
    }
    
    @media (max-width: 768px) {
        body {
            padding: 12px;
        }
    }
`;
