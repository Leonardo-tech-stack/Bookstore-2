import styled from "styled-components";
import { colors } from '../../styles/themes'
import Bg from '../../assets/images/background.jpg'

export const Body = styled.body`
  background-image: url(${Bg});
  background-position: center;
  background-size: cover;
  height: 100vh;
`;

export const Products = styled.div`
  /* flex-wrap: wrap; */
  /* justify-content: space-between; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 200px;

  h2 {
    font-size: 2.3rem;
    font-weight: 800;
    color: white;
    margin-top: 5%;
  }

  .products-container {
    display: flex;
    /* justify-content: center; */
    width: 100%;
  }

  .product {
    display: flex;
    align-items: center;
    width: calc(33.33%);
    margin: 7%;
    margin-top: 5%;
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
    font-size: 1.6rem;
    margin: 1% 0;
  }
`;

export const BannerHeading = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 2rem;
    font-weight: 800;
    color: white;
  }
`;

