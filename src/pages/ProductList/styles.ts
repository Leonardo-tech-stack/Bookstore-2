import styled from "styled-components";
import { colors } from '../../styles/themes';

export const Products = styled.div`

`;

export const Limiter = styled.div`

  .page-numbers {
    margin-left: 16%;

    button {
      padding: 0.2% 0.6%;
      margin-right: 0.8rem; 
      background-color: ${colors.principal};
      color: white;
      font-weight: 600;
    }

    button.current-page {
      background-color: white;
      color: black; 
    }
  }
`;
