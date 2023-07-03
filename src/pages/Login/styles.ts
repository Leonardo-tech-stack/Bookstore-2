import styled from "styled-components";
import { lighten } from 'polished';
import { colors } from "../../styles/themes";

export const Body = styled.div`
display: flex;
justify-content: center;
background-color: ${colors.fundo};
`;

export const Main = styled.main`
width: 42rem;
margin: 8% 0;
`;

export const Form = styled.form`
display: flex;
flex-direction: column;
height: 31.25rem;
background-color: white;
margin-top: 5%;

   .form-control {
      margin-left: 15%;
   }

   label {
      font-weight: 500;
   }

   input {
      padding: 8px;
      width: 25.625rem;
      border: 1px solid ${colors.bgButton};
      :focus {
        outline: none;
        box-shadow: 0px 2px 4px #000;
      }
   }

   label, input {
      margin: 3% 0;
   }

   .remember {
      width: 2%;
      margin-left: 15%;
      margin-right: 1%;

      &:hover {
         cursor: pointer;
      }
   }

   .esqueceu-a-senha {
      margin-left: 32%;
      font-weight: 500;

      &:hover {
         cursor: pointer;
         text-decoration: underline;
      }
   }

   .loading {
      margin-top: 2%;
      margin-left: 15%;
   }
`;

export const H1 = styled.h1`
font-size: 1.6rem;
font-weight: 600;
margin-top: 9%;
margin-bottom: 10%;
margin-left: 15%;
`;

export const Logar = styled.button`
border: none;
background-color: ${colors.principal};
color: white;
font-weight: 500;
border-radius: 10px;
padding: 10px 30px;
margin-top: 7%;
margin-left: 15%;

   &:hover{
      transition: 0.5s;
      background-color: ${props => lighten(0.11, colors.principal)};
   }
`;

export const Cadastrar = styled.div`
display: flex;
justify-content: center;

   p {
      font-size: 1rem;
      margin-top: 3%;
  
      button {
         border: none;
         font-weight: 500;
         margin: 8% 0;

         &:hover{
            text-decoration: underline;
         }
      }
   }
`;