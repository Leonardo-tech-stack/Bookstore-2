import styled from "styled-components";
import { lighten } from 'polished';
import { colors } from "../../styles/themes";

export const Form = styled.form`
display: flex;
flex-direction: column;
height: 33rem;
background-color: white;
margin-top: 5%;

h1 {
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
`;