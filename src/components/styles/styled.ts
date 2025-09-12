import styled from "styled-components";
import { white, mediumGray, lightGray, darkGray, black } from "./colors";

export const ZoomButton = styled.button`
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${white};
    color: ${black};
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    justify-content: center;
    transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
  }
`;

export const ZoomButtonContainer = styled.div`
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

interface IconImgProps {
  $active: boolean;
}

export const IconImg = styled.img<IconImgProps>`
display: inline-block;
vertical-align: middle;
width: 1.2em;
height: 1.2em;
margin-right: 0.5em;
filter: ${({ $active }) => $active ? 'invert(100%)' : 'invert(0%)'};
transition: filter 0.2s;
`;

export const DownloadIconImg = styled.img`
  display: inline-block;
  vertical-align: middle;
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.5em;
`;
export const LogoImg = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 250px;
  height: auto;
`;

export const PickerLabel = styled.label`
  display: block;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 14px;
    color: ${white};
`;

export const SectionHeading = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 18px;
    color: ${white};
`;

export const SectionText = styled.div`
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: ${white};
    & > span {
      font-weight: bold;

`

export const WarningText = styled.div`
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: ${white};
    font-weight: bold;

      & > img {
        vertical-align: middle;
        margin-right: 8px;
        width: 16px;
        height: 16px;
      }
    display: flex;
    align-items: center;
`

export const SectionContainer = styled.div`
  margin-bottom: 24px;
  padding: 12px 0;
  &:not(:last-child) {
    border-bottom: 1px solid ${mediumGray};
  }
`

export const PickerInput = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid ${lightGray};
  border-radius: 4px;
  font-size: 14px;
  background-color: transparent;
  color: white;
  &:focus {
    border-color: white;
    outline: none;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
  /* Chrome, Safari, Edge */
  &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
    background: transparent;
    color: white;
    -webkit-appearance: none;
    appearance: none;
    border: none;
  }
  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const PickerContainer = styled.div`  margin-bottom: 20px;`;

export const SidebarContainer = styled.div`
    width: 300px;  
    display: flex;
    flex-direction: column; 
    padding: 20px;
    box-sizing: border-box;
    background: ${darkGray};
    height: 100vh;
    overflow-y: auto;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  &[data-active="true"] {
    background: ${white};
    color: ${black};
  }
  background: ${darkGray};
  color: white;
  padding: 8px 16px;
  width: 100%;
  font-weight: bold;
  border: white 1px solid;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: color 0.2s, box-shadow 0.2s;
  &:hover {
    box-shadow: 0 0 5px rgba(255,255,255,0.5);
  }
`;

export const GridContainer = styled.div`
  width: calc(100% - 300px);
    background: black;
    margin: 0 auto;
    user-select: none;
    cursor: pointer;
`;

export const Heading = styled.h1`
    font-size: 24px;
    color: ${white};
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

export const MobileOverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${darkGray};
  color: ${white};
  z-index: 9999;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  @media (max-width: 1024px) {
    display: flex;
  }
`;

export const MobileOverlayCaption = styled.div`
  margin-top: 24px;
  padding: 0 20px;
  font-size: 14px;
`;

export const DownloadButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 1000;
  background: white;
  color: ${black};
  border: none;
  padding: 16px 28px;
  font-size: 1.1rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0,0,0,0.5);
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s, color 0.2s;
    @keyframes shake {
      0% { transform: translateX(0); }
      20% { transform: translateX(-5px); }
      40% { transform: translateX(5px); }
      60% { transform: translateX(-5px); }
      80% { transform: translateX(5px); }
      100% { transform: translateX(0); }
    }
    &:hover {
      box-shadow: 0 0 5px rgba(0,0,0,0.5);
      animation: shake 0.5s;
      background: ${white};
      outline: none;
    }
`;

export const FooterText = styled.div`
    font-size: 14px;
    color: ${lightGray};
    a {
        color: ${white};
        text-decoration: none;
        font-weight: bold;
        &:hover {
            text-decoration: underline;
        }
    }
`;  