import styled from "styled-components";
import { lighten } from 'polished';
import { colors } from "../../../styles/themes";

export const Title = styled.h2`
display: flex;
justify-content: center;
margin-top: 4%;
font-size: 1.6rem;
font-weight: 600;
`;

export const Div = styled.div`
display: flex;
justify-content: center;
font-size: 1.2rem;
margin: 5% 0;
        
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

                .user {
                    cursor: pointer;
                    text-decoration: underline;
                    padding-left: 7.75rem;

                    &:hover {
                        background-color: white;
                        box-shadow: 2px 2px 4px #000;
                    }
                }
            }
        }
    }
`;

export const Pages = styled.div`
  .page-numbers {
    margin-left: 16%;
    margin-bottom: 3%;

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