import styled from "styled-components";
import { motion } from "framer-motion";

export const StarsContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  background: transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat;
  z-index: -1;
  pointer-events: none;
  transition: opacity 0.3s ease;
  opacity: ${({ theme }) => (theme.theme === "dark" ? "0.4" : "0.1")};
`;