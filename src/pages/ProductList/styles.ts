import styled from "styled-components";
import { colors } from '../../styles/themes';

export const Products = styled.div`
margin: 2% 0;

  ul {
    display: flex;
    justify-content: center;
  }

  .products-container {
    text-align: center;
    margin: 5%;

    .name {
      max-width: 25rem;
    }
  }

  img {
    width: 25rem;
    height: 25rem;
    border: 1px solid ${colors.bgButton};
    border-radius: 35px;
  }
`;

export const Limiter = styled.div`
margin-bottom: 2%;

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
