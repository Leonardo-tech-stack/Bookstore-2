import styled from "styled-components";
import Link from '../../types/Link';
import { colors } from '../../styles/themes'

export const Div = styled.div`
display: flex;
flex-direction: column;
background-color: ${colors.principal};
color: white;

  h1 {
    font-size: 1.6rem;
    font-weight: 600;
    margin-top: 3%;
    margin-bottom: 2%;
  }
`;

export const H1Div = styled.div`
margin-left: 20%;

  h1 {
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

export const PDiv = styled.div`
width: 30%;
margin-left: 20%;
margin-bottom: 3%;

  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;