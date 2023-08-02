import styled from "styled-components";
import { lighten } from 'polished';
import { colors } from "../../styles/themes";

export const Body = styled.div`
display: flex;
justify-content: center;
height: 100vh;
background-color: ${colors.fundo};
`;

export const DivForm = styled.div`
display: flex;
flex-direction: column;
height: 38rem;
/* width: 45%; */
background-color: white;
margin-top: 5%;

    h2 {
        font-size: 1.6rem;
        font-weight: 600;
        margin-top: 7%;
        margin-bottom: 5%;
        margin-left: 15%;
    }

    .form-control {
        margin-left: 15%;
    }

    label {
        font-weight: 500;
    }

    input {
        padding: 8px;
        width: 25.625rem;
        margin: 3% 0;
        border: 1px solid ${colors.bgButton};
        :focus {
            outline: none;
            box-shadow: 0px 2px 4px #000;
        }
    }

    #confirm {
        width: 68%;
    }

    .error-message {
        margin-left: 15%;
    }

    @media only screen and (min-width: 320px) and (max-width: 480px) {
        height: 33rem;

        h2 {
            margin-left: 10%;
        }

        .form-control {
            margin-left: 10%;
        }

        label {
            display: none;
        }

        input {
            width: 89%;
        }

        #confirm {
            width: 89%;
        }

        .error-message {
            margin-left: 10%;
        }
    }
`;

export const Cadastrar = styled.button`
border: none;
background-color: ${colors.principal};
color: white;
width: 22%;
font-weight: 500;
border-radius: 10px;
padding: 10px 30px;
margin-top: 4%;
margin-left: 15%;
cursor: pointer;

    &:hover{
      transition: 0.5s;
      background-color: ${props => lighten(0.11, colors.principal)};
    }

    @media only screen and (min-width: 320px) and (max-width: 480px) {
        width: 69%;
        margin-top: 15%;
    }
`;