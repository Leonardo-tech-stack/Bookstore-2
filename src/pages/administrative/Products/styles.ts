import styled from "styled-components";
import { lighten } from 'polished';
import { colors } from '../../../styles/themes';

export const Lista = styled.div`
height: auto;

  .t-titulo {
    background-color: ${colors.titulo};

    h2 {
      font-size: 1.8rem;
      font-weight: 600;
      margin: 0.6% 0;
    }
  }

  .page-numbers {
    margin-left: 6%;
    margin-bottom: 6%;

    button {
      padding: 0.2% 1%;
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

  .search {
    display: flex;
    justify-content: space-evenly;
    white-space: nowrap;
    margin-top: 3%;

    .filter {
      display: flex;
      flex-direction: row;
      width: 30%;
      font-weight: 500;
      margin-left: 10%;

      p {
        font-size: 1.1rem;
      }

      select {
        margin-left: 2%;
        border: 1px solid ${colors.bgButton};
        border-radius: 2px;
      }
    }

    div {
      width: 15%;
    }

    a, .searchBtn {
      padding: 3px 8px;
      font-weight: 500;
      background-color: ${colors.principal};
      color: white;
      border-radius: 14px;

      &:hover {
        transition: 0.5s;
        background-color: ${props => lighten(0.11, colors.principal)};
      }
    }

    input {
      padding: 1% 0;
      padding-left: 2%;
      border: 1px solid ${colors.principal};
      border-radius: 14px;
      margin-right: 1%;
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    margin-top: 40px;
    margin-bottom: 500px;

    .search {
      width: 100%;
      margin: 5%;
      padding-right: 9%;
      white-space: normal;

      .search-bar {
        display: flex;
        flex-direction: row;
        justify-content: right;
      }

      .register {
        display: none;
      }

      .filter {
        justify-content: end;
        width: 100%;
        margin-bottom: 2%;
        margin-left: 0;

        p {
          width: 30%;
        }

        select {
          margin-left: 15%;
        }
      }

      div {
        width: 100%;
      }

      a, .searchBtn {
        padding: 3px 8px;
        margin-bottom: 15%;
      }
    }

    div {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;

      a,
      .searchBtn {
        margin-top: 1%;
      }

      input {
        margin-top: 1%;
      }
    }

    .page-numbers {
      margin-left: 5%;
      margin-top: 10%;

      button {
        padding: 2% 4.5%;
        margin-right: 0.8rem; 
        margin-bottom: 5%;
        margin-right: 5%;
      }
    }
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) {
    margin-top: 40px;
    margin-bottom: 500px;

    .search {
      width: 100%;
      margin: 5%;
      padding-right: 9%;

      .search-bar {
        display: flex;
        flex-direction: row;
        justify-content: right;
        margin-bottom: -4%;

        button {
          padding: 6px 20px;
        }
      }

      .register {
        display: none;
      }

      .filter {
        justify-content: center;
        width: 100%;
        margin-bottom: 2%;
        margin-left: 1%;

        p {
          width: 30%;
          white-space: nowrap;
          font-size: 1.3rem;
        }

        select {
          font-size: 1.3rem;
          padding: 2px 10px;
          margin-left: 15%;
        }

        option {
          font-size: 1rem;
        }
      }

      div {
        width: 100%;
      }

      a, .searchBtn {
        padding: 3px 8px;
        margin-bottom: 15%;
      }
    }

    div {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;

      a,
      .searchBtn {
        margin-top: 1%;
      }

      input {
        margin-top: 1%;
      }
    }

    .page-numbers {
      margin-left: 15%;
      margin-top: 10%;

      button {
        font-size: 1.3rem;
        padding: 0.5% 2%;
        margin-bottom: 5%;
        margin-right: 2%;
      }
    }
  }

`;

export const Table = styled.table`
  /* max-width: 1200px; */
  width: 90%;
  margin: 0 auto;
  margin-top: 2%;
  margin-bottom: 5%;
  border-collapse: collapse;
  border: 1px solid ${colors.bgButton};
  /* background-color: ${colors.fundo}; */

  @media only screen and (min-width: 320px) and (max-width: 768px) {
    width: 95%;
    overflow: auto;
  }
`;

export const Tr = styled.tr`
border-right: 1px solid ${colors.bgButton};
background-color: ${colors.titulo};

  .t-img {
    padding: 0 3%;
  }
  .t-nome {
    padding: 1.25rem 11.625rem;
  }
  .t-quantidade {
    padding: 1.25rem 0.625rem;
  }
  .t-ações {
    padding: 1.25rem 3.75rem;
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    .t-img,
    .t-nome,
    .t-ações {
      padding: 0.6rem 0.3rem;
    }

    .t-valor,
    .t-quantidade {
      display: none;
    }
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) {
    .t-img,
    .t-nome,
    .t-ações {
      padding: 0.6rem 0.3rem;
    }

    .t-valor,
    .t-quantidade {
      display: none;
    }
  }

`;

export const Tr2 = styled.tr`
border-right: 1px solid ${colors.bgButton};
background-color: ${colors.fundo};

  .img, .nome, .valor, .quantidade {
    padding: 10px 40px;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .quantidade {
    padding-left: 6%;
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    .img,
    .nome {
      padding: 10px 15px;
    }

    .valor,
    .quantidade {
      display: none;
    }
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) {
    .img,
    .nome {
      padding: 10px 15px;
    }

    .valor,
    .quantidade {
      display: none;
    }
  }

`;

export const Th = styled.th`
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 1px solid ${colors.bgButton};
`;

export const Td = styled.td`
  border-bottom: 1px solid ${colors.bgButton};

  .ações {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .btn-editar,
    .btn-excluir {
      margin-right: 10px;
      font-size: 21px; 
      cursor: pointer;
      color: ${colors.principal};
      transition: color 0.3s;

      &:hover {
        color: ${props => lighten(0.11, colors.principal)};
      }
    }
  }
`;

export const NEncontrado = styled.p`
  display: flex;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  margin-top: 7%;
  margin-bottom: 13%;

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    text-align: center;
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) {
    margin-top: 12%;
  }

`;