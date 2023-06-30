import styled from "styled-components";
import { colors } from "../../../styles/themes";

export const H1 = styled.h1`
margin-top: 4%;
margin-left: 7%;
font-size: 1.6rem;
font-weight: 600;
`;

export const Tabelas = styled.div`
display: flex;
justify-content: space-evenly;
margin: 4% 0;

h2 {
    font-size: 1.6rem;
    margin-bottom: 2%;
}

table {

    tbody {
        border: 1px solid ${colors.bgButton};
        
        tr {
            border: 1px solid ${colors.bgButton};

            td {
                border: 1px solid ${colors.bgButton};
                padding: 13px;
            }

            .name {
                font-weight: 600;
            }
        }
    }

    thead {
      tr {
        th {
          border: 1px solid ${colors.bgButton};
          padding: 15px 160px; 
        }
      }
    }
  }
`;

export const Administradores = styled.table`
  .page-numbers {
    margin-top: 3%;

    button {
      padding: 0.2% 1.6%;
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

export const Clientes = styled.table`
  .page-numbers {
    margin-top: 3%;

    button {
      padding: 0.2% 1.6%;
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
