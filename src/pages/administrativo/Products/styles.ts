import styled from "styled-components";
import { lighten } from 'polished';
import { colors } from '../../../styles/themes';

export const Lista = styled.div`
height: 100vh;

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 2% 14%;
  }

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

  .search {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1%;

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
`;

export const Tabela = styled.table`
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 5%;
  border-collapse: collapse;
  border: 1px solid ${colors.bgButton};
  /* background-color: ${colors.fundo}; */
`;

export const Linha1 = styled.tr`
border-right: 1px solid ${colors.bgButton};
background-color: #d4d4d4;

  .t-img {
    padding: 0 3%;
  }
  .t-nome {
    padding: 1.25rem 16.625rem;
  }
  .t-valor {
  
  }
  .t-quantidade {
    padding: 1.25rem 0.625rem;
  }
  .t-ações {
    padding: 1.25rem 3.75rem;
  }
`;

export const Linha2 = styled.tr`
border-right: 1px solid ${colors.bgButton};
background-color: ${colors.fundo};

  .img, .nome, .valor, .quantidade {
    padding: 10px 80px;
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

export const TbTitulo = styled.th`
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 1px solid ${colors.bgButton};
`;

export const Unidade = styled.td`
  border-bottom: 1px solid ${colors.bgButton};

  button {
    padding: 3px 12px;
    margin-left: 6%;
    font-weight: 500;
    color: white;
    /* background-color: #f3a43e; */   //cor 1
    background-color: #ebe5e5;
    border-radius: 14px;
  } 
`;

export const Excluir = styled.button`
   
  &.btn-excluir {
    padding: 3px 8px;
    margin-left: 6%;
    font-weight: 500;
    background-color: ${colors.principal};
    color: white;
    border-radius: 14px;

    &:hover {
      transition: 0.5s;
      background-color: ${props => lighten(0.11, colors.principal)};
    }
  }
`;

export const NEncontrado = styled.p`
  display: flex;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  margin-top: 7%;
`;