import styled from "styled-components";
import { lighten } from 'polished';
import { colors } from '../../styles/themes';
import ReactModal from "react-modal";

export const StyledModal = styled(ReactModal)`
display: flex;
justify-content: center;
height: 55%;
width: 45%;
margin-top: 10%;
margin-left: 25%;
background-color: white;
border: 1px solid #000;

  div {
    margin: 5%;

    span {
      font-weight: 500;
    }
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  table {
    width: 30vw;
    text-align: center;
    border-collapse: collapse;
  }

  tr {
    border-collapse: collapse;
  }

  th {
    border: 1px solid #ccc;
    background-color: ${colors.titulo};
  }

  td {
    border: 1px solid #ccc;
    padding: 8px;
  }

  button {
    font-weight: 500;
    margin-top: 20px;
    padding: 8px 16px;
    /* background-color: #f0f0f0; */
    background-color: ${colors.principal};
    color: white;
    border: none;
    border-radius: 4px;

    &:hover {
      transition: 0.5s;
      background-color: ${props => lighten(0.11, colors.principal)};
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    height: 85%;
    width: 85%;
    margin-left: 7.8%;

    table {
      width: 65vw;
    }

    .close {
      display: flex;
      justify-content: end;
      margin-right: 0;
    }
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) {
    height: 85%;
    width: 85%;
    margin-left: 7.8%;

    h2 {
      font-size: 1.7rem;
    }

    table {
      width: 65vw;
    }

    th, td {
      font-size: 1.3rem;
    }

    .close {
      display: flex;
      justify-content: end;
      margin-right: 0;
    }
  }

`;
