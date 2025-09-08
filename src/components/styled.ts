import styled from "styled-components";

export const PickerLabel = styled.label`
  display: block;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 14px;
    color: #333;
`;

export const PickerInput = styled.input`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    &:focus {
        border-color: #0070f3;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 112, 243, 0.5);
    }
`;

export const PickerContainer = styled.div`  margin-bottom: 20px;`;

export const SidebarContainer = styled.div`
  width: 15%;   
    padding: 20px;
    box-sizing: border-box;
    background: #f5f5f5;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: 1px solid #ddd;
`;

export const Button = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? '#0070f3' : '#eee'};
    color: ${props => props.active ? '#fff' : '#333'};  
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
        background: ${props => props.active ? '#005bb5' : '#ddd'};
    }
`;

export const GridContainer = styled.div`
    background: #ccc;
    margin: 0 auto;
    user-select: none;
    border: 1px solid #bbb;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    cursor: pointer;
    & > div {
        background: #fff;
        box-sizing: border-box;
    }
`;

export const Heading = styled.h1`
    font-size: 24px;
    color: #333;
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