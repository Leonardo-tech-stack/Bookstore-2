import styled, { css } from "styled-components";
import { lighten } from 'polished';
import { colors } from "../../../styles/themes";

interface TabelasProps {
  isMobile: boolean;
  showRoleColumn: boolean;
}

export const H1 = styled.h1`
  margin-top: 4%;
  margin-left: 4%;
  font-size: 1.6rem;
  font-weight: 600;

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: flex;
    justify-content: center;
    margin-top: 20%;
    margin-bottom: 15%;
  }
`;

export const Search = styled.div`
  display: flex;
  justify-content: center;

  input {
    width: 15%;
    padding: 5px;
    border: 1px solid #000;
    border-radius: 5px;
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {

    input {
      width: 60%;

      :focus {
        outline: none;
        box-shadow: 0px 2px 4px #000;
      }
    }
  }
`;

export const Tabelas = styled.div<TabelasProps>`
  display: flex;
  justify-content: space-evenly;
  margin: 4% 0;

  .flex {
    flex-direction: column;

    .page-numbers {
      margin-top: 2%;

      button {
        padding: 0.5% 1.5%;
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
  }

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

          ${props =>
            props.isMobile &&
            css`
              padding: 5px;
              display: block;
              width: 100%;
            `}
        }

        .name {
          font-weight: 600;
        }

        td.role {
          display: none;
          ${props =>
            props.isMobile &&
            props.showRoleColumn &&
            css`
              display: table-cell;
            `}
        }
      }
    }

    thead {
      tr {
        th {
          border: 1px solid ${colors.bgButton};
          padding: 15px 160px;

          ${props =>
            props.isMobile &&
            css`
              padding: 15px 10px;
              display: none;
            `}
        }
      }
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
    font-weight: 500;

    table {
      align-items: center;
      text-align: center;
      width: 95%;
      
      thead {
        
        tr {
          display: none;
          th {
            border: none;
          }
        }
      }

      tbody {
        border: none;

        .name, .email, .role {
          border-bottom: 1px solid ${colors.bgButton};
        }

        tr {
          display: flex;
          flex-direction: column;
          text-align: center;
          margin-bottom: 20px;
          border: none;
          width: 100%;
          border: none;
          padding: 5px 0;
          border: 1px solid ${colors.bgButton};

          td {
            display: block;
            width: 100%;
            border: none;
            padding: 10px 0;
          }
        }
      }
    }

    .page-numbers {
      margin-top: 3%;
      margin-bottom: 15%;
      margin-left: 3%;

      button {
        padding: 1% 4%;
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
  }
`;

export const Administradores = styled.div`
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

  .actions {
    padding: 0 4.25rem;
  }

  button {
    padding: 3px 8px;
    margin-left: 10%;
    font-weight: 500;
    background-color: ${colors.principal};
    color: white;
    border-radius: 14px;

    &:hover {
      transition: 0.5s;
      background-color: ${props => lighten(0.11, colors.principal)};
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: flex;
    justify-content: center;
    font-weight: 500;
    margin-left: 2%;

    .actions {
      padding: 0;
      margin: 10px 0;
    }

    button {
      margin-left: 0;
    }

    .page-numbers {
      margin-top: 3%;
      margin-bottom: 15%;
      margin-left: 3%;

      button {
        padding: 1% 4%;
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
  }
`;

export const Clientes = styled.div`
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

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: flex;
    justify-content: center;

    .page-numbers {
      button {
        padding: 0.2% 2%;
      }
    }
    
  }
`;
