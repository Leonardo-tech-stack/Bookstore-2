import styled from "styled-components";
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
`;


export const Tabela = styled.table`
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 5%;
  border-collapse: collapse;
  border: 1px solid ${colors.bgButton};
`;

export const Linha1 = styled.tr`
border-right: 1px solid ${colors.bgButton};

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
  border-right: 1px solid ${colors.bgButton};
`;

export const Unidade = styled.td`
  border-bottom: 1px solid ${colors.bgButton};
  border-right: 1px solid ${colors.bgButton};
  
  button {
    padding: 6px 15px;
    margin-left: 6%;
    font-weight: 500;
    color: white;
    /* background-color: #f3a43e; */   //cor real
    background-color: #ebe5e5;
    border-radius: 30px;
  } 
`;

export const Excluir = styled.button`
   
  &.btn-excluir {
    padding: 6px 11px;
    margin-left: 6%;
    font-weight: 500;
    background-color: red;
    color: white;
    border-radius: 30px;
  }
`;
