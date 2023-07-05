import styled from "styled-components";
import { colors } from '../../styles/themes'
import Bg from '../../assets/images/background.jpg'

export const Body = styled.body`
  /* background-image: url(${Bg});
  background-position: center;
  background-size: cover; */
  background-color: ${colors.fundo};
  height: 1200px;
`;

export const Products = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 2.3rem;
    font-weight: 800;
    color: ${colors.principal};
    margin-top: 5%;
  }

  .products-container {
    display: flex;
    width: 100%;
    margin-top: 18%;
  }

  .product {
    text-align: center;
    width: calc(33.33%);
    margin: 7%;
    margin-top: 1%;
  }

  .middle-card {
    margin-top: -10%;
  }

  > div {  
    margin: 5% 0;
  }

  h1 {
    margin: 3% 0;
    font-size: 2rem;
    font-weight: 600;
  }

  p {
    max-width: 25rem;
    font-size: 1.6rem;
    margin: 1% 0;
    font-weight: 600;
  }

  img {
    width: 25rem;
    height: 25rem;
    border: 1px solid ${colors.bgButton};
    border-radius: 35px;
  }
`;
