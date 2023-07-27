import styled from "styled-components";
import { lighten } from "polished";
import { colors } from "../../styles/themes";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  width: 53.800rem;
  height: 37.5rem;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const Div = styled.div`
font-size: 1.2rem;

  h2 {
    font-size: 1.6rem;
    font-weight: 600;
  }
        
  table {
    background-color: ${colors.fundo};
    border: 1px solid ${colors.bgButton};
    thead {
      tr {
        background-color: ${colors.titulo};
        border-bottom: 1px solid ${colors.bgButton};
        th {
          padding: 10px 80px;
        }
      }
    }

    tbody {
      tr {
        img {
          border-radius: 5px;
        }

        .total {
          padding: 1%;
          padding-left: 50px;
        }
        
        td {
          font-weight: 500;
          padding: 10px 80px;
          padding-left: 110px;
          border-bottom: 1px solid ${colors.bgButton};

          button {
            &:hover {
              text-decoration: underline;
              text-shadow: 0px 2px 2px #c4c4c4;
            }
          }
        }
      }
    }
  }

  button {
    font-weight: 500;
    margin-top: 20px;
    padding: 8px 16px;
    background-color: ${colors.principal};
    color: white;
    border: none;
    border-radius: 4px;

    &:hover {
      transition: 0.5s;
      background-color: ${props => lighten(0.11, colors.principal)};
    }
  }
`;