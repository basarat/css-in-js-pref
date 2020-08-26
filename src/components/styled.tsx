import styled from 'styled-components';

export const Column = styled.div<{
  gap: number;
}>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap}px;
`;

export const Button = styled.button`
  padding: 32px;
  background-color: lightskyblue;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;