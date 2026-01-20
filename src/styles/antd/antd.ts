import { css } from "styled-components";
import { tableStyles } from "./components/table";
import { inputStyles } from "./components/input";
import { alertStyles } from "./components/alert";
import { modalStyles } from "./components/modal";

export const antdStyles = css`
  ${tableStyles}
  ${inputStyles}
  ${alertStyles}
  ${modalStyles}
`;
