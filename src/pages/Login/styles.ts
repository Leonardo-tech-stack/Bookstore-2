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

@media only screen and (min-width: 320px) and (max-width: 480px) {
   width: 85%;
}

@media only screen and (min-width: 481px) and (max-width: 768px) {
   width: 85%;
}

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
      color: red;

      &:hover {
         cursor: pointer;
      }

      :focus {
         box-shadow: none;
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

   @media only screen and (min-width: 320px) and (max-width: 480px) {
      height: 27.3rem;

      .form-control {
         margin-left: 6%;
      }

      input {
         width: 65%;
      }

      .checkbox {
         display: flex;
         flex-direction: column;

         input {
            width: 20px;
            margin: 0;
         }

         label {
            margin-left: 2%;
         }

         .remember {
            margin: 10% 0;
            margin-left: 6%;
         }

         .esqueceu-a-senha {
            margin-left: 6%;
            margin-top: 2%;
         }
      }
   }

   @media only screen and (min-width: 481px) and (max-width: 768px) {
      height: auto;
      padding-bottom: 15px;

      .form-control {
         margin-left: 6%;
      }

      label, .remember {
         font-size: 1.3rem;
      }

      input {
         width: 75%;
         font-size: 1.3rem;
      }

      .checkbox {
         display: flex;
         flex-direction: column;

         input {
            width: 20px;
            margin: 0;
         }

         label {
            margin-left: 2%;
         }

         .remember {
            margin: 10% 0;
            margin-left: 6%;
         }

         .esqueceu-a-senha {
            margin-left: 6%;
            margin-top: 2%;
         }
      }
      
      .loading {
         display: flex;
         justify-content: center;
         font-size: 1.3rem;
         margin-left: 0;
      }
   }
`;

export const H2 = styled.h2`
font-size: 1.6rem;
font-weight: 600;
margin-top: 9%;
margin-bottom: 10%;
margin-left: 15%;

@media only screen and (min-width: 320px) and (max-width: 480px) {
   margin-left: 6%;
}

@media only screen and (min-width: 481px) and (max-width: 768px) {
   font-size: 2rem;
   margin-left: 6%;
}

`;

export const Validation = styled.p`
font-size: 1rem;
font-weight: 500;
margin-left: 15%;
color: red;

   a {
      color: black;
      font-weight: 500;

      &:hover{
         text-decoration: underline;
      }
   }

   @media only screen and (min-width: 320px) and (max-width: 480px) {
      margin-left: 6%;
      margin-bottom: 5%;
   }

   @media only screen and (min-width: 481px) and (max-width: 768px) {
      width: 85%;
      font-size: 1.3rem;
      margin-left: 6%;
      margin-bottom: 5%;
   }

`;

export const Logar = styled.button`
border: none;
background-color: ${colors.principal};
color: white;
font-weight: 500;
border-radius: 10px;
padding: 10px 30px;
margin-top: 4%;
margin-left: 15%;

   &:hover{
      transition: 0.5s;
      background-color: ${props => lighten(0.11, colors.principal)};
   }

   @media only screen and (min-width: 320px) and (max-width: 480px) {
      margin-top: 1%;
      margin-left: 53%;
   }

   @media only screen and (min-width: 481px) and (max-width: 768px) {
      font-size: 1.3rem;
      margin-top: 1%;
      margin-left: 65%;
   }

`;

export const Register = styled.div`
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

   @media only screen and (min-width: 320px) and (max-width: 480px) {
      margin-left: 6%;
   }

   @media only screen and (min-width: 481px) and (max-width: 768px) {

      p {
         font-size: 1.3rem;
      }
   }
`;