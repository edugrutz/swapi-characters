import { css } from "styled-components";
import { tableStyles } from "./components/table";
import { inputStyles } from "./components/input";
import { alertStyles } from "./components/alert";

export const antdStyles = css`
  ${tableStyles}
  ${inputStyles}
    ${alertStyles}
`;
