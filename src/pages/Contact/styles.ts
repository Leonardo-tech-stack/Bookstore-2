import styled from "styled-components";
import { colors } from "../../styles/themes";

export const Body = styled.div`
display: flex;
justify-content: center;
background-color: ${colors.fundo};
height: 100vh;
`;

export const Div = styled.div`
background-color: white;
width: 30%;
height: 30%;
margin: 10%;
border-radius: 35px;

    div {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 50%;
        
        a {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            border-radius: 35px;

            &:hover {
                box-shadow: 0px 2px 4px #000;
            }

            img {
                margin-left: 15%;
            }

            strong {
                font-size: 1.5rem;
                margin-left: 5%;
            }
        }
    }

    img {
        width: 4rem;
        height: 4rem;
    }

    @media only screen and (min-width: 320px) and (max-width: 480px) {
        width: 85%;

        div {
            a {
                &:focus {
                    box-shadow: 0px 2px 4px #000;
                }

                strong {
                    margin-left: 10%;
                }
            }
        }
    }

    @media only screen and (min-width: 481px) and (max-width: 768px) {
        width: 90%;

        div {
            a {
                &:focus {
                    box-shadow: 0px 2px 4px #000;
                }

                strong {
                    font-size: 1.6rem;
                    margin-left: 8%;
                }
            }
        }

        img {
            width: 5rem;
            height: 5rem;
        }
    }

`;