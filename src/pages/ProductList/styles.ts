import styled from "styled-components";
import { colors } from '../../styles/themes';

export const Products = styled.div`
margin: 2% 0;

  .filter {
    display: flex;
    flex-direction: row;
    font-weight: 500;
    margin-left: 15%;
    margin-bottom: 1%;

    p {
      font-size: 1.1rem;
      margin-right: 1%;
    }

    select {
      border: 1px solid ${colors.bgButton};
      border-radius: 2px;
    }
  }

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

  @media only screen and (min-width: 320px) and (max-width: 480px) {

    .filter {
      margin-top: 8%;
    }

    ul {
      display: flex;
      flex-direction: column;
    }

    li {
      display: flex;
      justify-content: center;
      margin: 0 2%;

      h1 {
        font-size: 1rem;
        margin: 2% 0;
      }
    }

    .products-container {
      margin: 10% 0;
    }

    img {
      max-width: 18rem;
      max-height: 20rem;
      border-radius: 15px;
      margin: auto;
    }
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) {

    .filter {
      margin-top: 8%;
      font-size: 1.3rem;
      
      p {
        font-size: 1.5rem;
      }
    }

    ul {
      display: flex;
      flex-direction: column;
    }

    li {
      display: flex;
      justify-content: center;
      margin: 0 2%;

      h1 {
        margin: 2% 0;
      }

      h1, p{
        font-size: 1.2rem;
      }
    }

    .products-container {
      margin: 6% 0;
    }

    img {
      max-width: 20rem;
      max-height: 22rem;
      border-radius: 15px;
      margin: auto;
    }
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

  @media only screen and (min-width: 320px) and (max-width: 768px) {
    /* margin-bottom: 10%;

    .page-numbers {

      button {
        padding: 0.8% 4%;
        margin-right: 1rem; 
      }
    } */
    .scroll-down-icon {
      position: fixed;
      bottom: 20px;
      right: 20px;
      cursor: pointer;
      z-index: 1000;
      background-color: #EFF2F6;
      border-radius: 50%;
    }
  }
`;
