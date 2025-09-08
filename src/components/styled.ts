import styled from "styled-components";

export const PickerLabel = styled.label`
  display: block;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 14px;
    color: white;
`;

export const PickerInput = styled.input`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    background-color: #242424;
    color: white;
    &:focus {
        border-color: white;
        outline: none;
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }
`;

export const PickerContainer = styled.div`  margin-bottom: 20px;`;

export const SidebarContainer = styled.div`
  width: 15%;   
    padding: 20px;
    box-sizing: border-box;
    background: #242424;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
`;

export const Button = styled.button`
  &[data-active="true"] {
    background: white;
    color: black;
  }
  background: #242424;
  color: white;
  padding: 8px 16px;
  border: white 1px solid;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    &[data-active="true"] {
      background: white;
    }
    background: #242424;
  }
`;

export const GridContainer = styled.div`
    background: black;
    margin: 0 auto;
    user-select: none;
    cursor: pointer;
`;

export const Heading = styled.h1`
    font-size: 24px;
    color: white;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding-bottom: 10px;
`;

export const ColorPickerContainer = styled.div`
    margin-bottom: 20px;
    margin-top: 10px;

    & .react-colorful {
  width: 100%;
    height: 200px;
    }
    & .react-colorful__hue {
  border-radius: 0 0 4px 4px;
    }
    & .react-colorful__saturation {
  border-radius: 4px 4px 0 0;
  `

export const MobileOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  color: #fff;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const CornerInstruction = styled.div`
  position: fixed;
  top: 16px;
  right: 24px;
  color: #fff;
  font-size: 0.95rem;
  background: rgba(0,0,0,0.3);
  padding: 6px 12px;
  border-radius: 8px;
  z-index: 100;
  pointer-events: none;
`;