import styled, { keyframes } from "styled-components";
import { darkGray, mediumGray, white } from "../../app/colors";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${darkGray};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
`;

export const LoaderSpinner = styled.div`
  width: 64px;
  height: 64px;
  border: 8px solid ${mediumGray};
  border-top: 8px solid ${white};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
