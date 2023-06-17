import styled from "styled-components";

export const H1 = styled.h1`
   color: brown;
   align-items: center;
   margin-left: 180px;
`;

export const Logar = styled.button`
   border: none;
   background-color: brown;
   color: #fff;
   border-radius: 10px;
   padding: 10px 30px;
   margin-top:40px;
   cursor: pointer;
   &:hover{
      background-color: blue;
      transition: 0.4ms;
   }
`;

export const Cadastrar = styled.button`
   border: none;
   background-color: brown;
   color: #fff;
   border-radius: 10px;
   padding: 10px 30px;
   margin-top:40px;
   cursor: pointer;
   &:hover{
      background-color: blue;
      transition: 0.4ms;
   }
`;

export const Main = styled.main`
   border: 5px solid brown;
   width: 500px;
   margin-left: 400px;
   margin-right: 300px;
   margin-top: 160px;
   box-sizing: border-box;
   align-items: center;
   background-color: grey;   
`;

export const Form = styled.form`
   display: flex;
   align-items: center;
   flex-direction: column;
   width: 50px;
   margin-bottom: 100px;
   margin-left: 200px;
`;