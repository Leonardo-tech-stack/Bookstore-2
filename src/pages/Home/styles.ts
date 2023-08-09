import styled from "styled-components";
import { colors } from '../../styles/themes'

export const Body = styled.body`
  background-color: ${colors.fundo};
  height: 1400px;

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    height: 900px;
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) {
    height: 1200px;
  }
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
    margin-top: 10%;
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
    height: 27rem;
    border: 1px solid ${colors.bgButton};
    border-radius: 35px;
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {

    .products-container {
      display: flex;
      justify-content: center;
    }

    .product {
      display: flex;
      justify-content: center;
      width: 100vw;

      h1, p {
        font-size: 1.5rem;
      }
    }

    h2 {
      text-align: center;
    }

    img {
      max-width: 16rem;
      height: 22rem;
      margin: 0 auto;
    }
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) {
    
    .products-container {
      display: flex;
      justify-content: center;
    }

    .product {
      display: flex;
      justify-content: center;
      width: 100vw;

      h1, p {
        font-size: 1.5rem;
      }
    }

    h2 {
      text-align: center;
    }

    img {
      max-width: 18rem;
      height: 22rem;
      margin: 0 auto;
    }
  }
`;

export const Desc = styled.div`
  text-align: center;
  color: #4d4d4d;

  p {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: -15%;
  }

  span {
    white-space: nowrap;
    margin-right: 5px;
  }

  button {
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 7%;
    width: 35%;
    background-color: white;
    color: ${colors.principal};
    border: 2px solid ${colors.principal};

    &:hover {
      box-shadow: 0px 2px 4px #000;
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    p, span {
      font-size: 0.8rem;
      margin-top: 5px;
    }

    button {
      font-size: 0.8rem;
      height: 45px;
      width: 85px;
    }
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) {
    p, span {
      font-size: 1.3rem;
      margin-top: 5px;
    }

    button {
      font-size: 1rem;
      height: 38px;
      width: 120px;
    }
  }
`;