import styled from "styled-components";
import { colors } from "../../../styles/themes";

export const Title = styled.h2`
display: flex;
justify-content: center;
margin-top: 4%;
font-size: 1.6rem;
font-weight: 600;

    @media only screen and (min-width: 320px) and (max-width: 768px) {
        margin-top: 12%;
        margin-bottom: 10%;
    }
`;

export const Div = styled.div`
display: flex;
justify-content: center;
font-size: 1.2rem;
margin: 5% 0;
        
    table {
        max-width: 95%;
        background-color: ${colors.fundo};
        border: 1px solid ${colors.bgButton};
        thead {
            tr {
                background-color: ${colors.titulo};
                border-bottom: 1px solid ${colors.bgButton};
                th {
                    padding: 10px 8px;
                }
            }
        }

        tbody {
            tr {
                td {
                    font-weight: 500;
                    padding: 10px 80px;
                    padding-left: 60px;
                    border-bottom: 1px solid ${colors.bgButton};

                    button {
                        padding-left: 15px;
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

    @media only screen and (min-width: 320px) and (max-width: 480px) {
        width: 95%;
        margin: 5% 0;
        margin-left: 2.5%;
                
        table {
            width: 100%;
            thead {
                tr {
                    th {
                        font-size: 1rem;
                        padding: 10px 5px;
                    }
                }
            }

            tbody {
                tr {
                    text-align: center;
                    td {
                        font-size: 0.8rem;
                        padding: 10px 5px;

                        button {
                            text-decoration: underline;

                            &:focus {
                                text-shadow: 0px 2px 2px #c4c4c4;
                            }
                        }
                    }

                    .user {
                        padding-left: 2px;

                    }
                }
            }
        }
    }

    @media only screen and (min-width: 481px) and (max-width: 768px) {
        width: 95%;
        margin: 5% 0;
        margin-left: 2.5%;
                
        table {
            width: 100%;
            thead {
                tr {

                    th {
                        font-size: 1.2rem;
                        padding: 10px 5px;
                    }
                }
            }

            tbody {
                tr {
                    text-align: center;
                    td {
                        font-size: 1.1rem;
                        padding: 10px 5px;

                        button {
                            text-decoration: underline;

                            &:focus {
                                text-shadow: 0px 2px 2px #c4c4c4;
                            }
                        }
                    }

                    .user {
                        padding-left: 2px;

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

    @media only screen and (min-width: 320px) and (max-width: 480px) {

        .page-numbers {
            margin-top: 10%;
            margin-bottom: 15%;
            margin-left: 2%;
           
            button {
                padding: 0.5% 3.5%;
                margin-right: 0.8rem; 
            }
        }
    }

    @media only screen and (min-width: 481px) and (max-width: 768px) {

        .page-numbers {
            margin-top: 10%;
            margin-bottom: 15%;
            margin-left: 2%;
           
            button {
                padding: 0.5% 2%;
                margin-right: 0.8rem; 
            }
        }
    }
`;