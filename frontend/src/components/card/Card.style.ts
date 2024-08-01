import styled from "styled-components";

interface TextProps {
  size: string;
  bold?: string;
  color?: string;
}

export const Card = styled.div`
  font-family: "Verdana", sans-serif;
  margin: 10px;
  width: 50%;
  height: 70%;
  box-shadow: 0 8px 20px rgb(0 0 0 / 15%);
  border-radius: 6px;
  padding: 10px;
  background: white;
  display: flex;
  align-items: center;
  img {
    border-radius: 45%;
    object-fit: cover;
    display: flex;
    width: 50px;
  }
`;

export const CardInfo = styled.div`
  flex: 1;
  margin-left: 10px;
`;

export const Text = styled.div<TextProps>`
  font-size: ${({ size }) => size};
  font-weight: ${({ bold }) => bold};
  color:  ${({ color }) => color}; 
  ;
`;
