import styled from "styled-components";
import { lighten } from 'polished';
import { colors } from '../../../styles/themes';

export const DivEditProduct = styled.div`
   width: 65%;
   margin: 3% 9%;
   padding: 2% 3%;
   border: 1px solid ${colors.bgButton};
   border-radius: 35px;

   h2 {
      font-size: 1.6rem;
      font-weight: 600;
   }

   form {
      .name {
         width: 75%;
      }

      .price, .inventory {
         width: 10%;
      }

      .image {
         border: none;

         :focus {
            box-shadow: none;
         }
      }
   }

   div {
      margin: 3% 0;
   }

   .add {
      display: flex;
      flex-direction: row;
   }

   label {
      white-space: nowrap;
      font-weight: 600;
   }

   input {
      width: 81%;
      margin-left: 1%;
      padding: 0.6% 1%;
      border: 1px solid ${colors.bgButton};
      border-radius: 5px;
      
      :focus {
         outline: none;
         box-shadow: 0px 2px 4px #000;
      }
   }

   textarea {
      width: 81%;
      margin-left: 1%;
      padding: 0.6% 1.4%;
      border: 1px solid ${colors.bgButton};
      border-radius: 5px;
   }

   .div-images {
      li {
         img {
            width: 60%;
            height: auto;
            border: 1px solid #ccc;
            border-radius: 5px;
         }
      }
   }

   .images-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px; 

      li {
         display: flex;
         justify-content: center;
         flex-direction: column;
         align-items: center;
         width: calc(33.33% - 10px);
      }

      button {
         width: 30%;
         background-color: ${colors.principal};
         color: white;
         border: none;
         border-radius: 5px;
         padding: 4px 5px;
      }
   }

   button {
      padding: 6px 15px;
      margin: 2% 0;
      color: white;
      background-color: ${colors.principal};
      font-weight: 500;
      border-radius: 30px;

      &:hover {
         transition: 0.5s;
         background-color: ${props => lighten(0.11, colors.principal)};
      }
   }

   @media only screen and (min-width: 320px) and (max-width: 480px) {
      width: 95%;
      margin: 8% 2%;
      padding: 3%;

      h2 {
         text-align: center;
         font-size: 1.5rem;
         margin-bottom: 10%;
      }

      form {
         .name, textarea {
            width: 98%;
            margin-bottom: 5%;
         }

         .price, .inventory {
            width: 25%;
            margin-bottom: 5%;
         }
      }

      .div-images {
         li {
            margin: 8% 0;
            img {
               width: 85%;
            }
         }
      }

      .images-container {

         button {
            width: 80%;
         }
      }

      .add {
         flex-direction: column;
         margin-bottom: 8%;

         input {
            margin: 2% 0;
         }
      }

      .submit {
         display: flex;
         justify-content: end;

      }
   }

   @media only screen and (min-width: 481px) and (max-width: 768px) {
      width: 95%;
      margin: 8% 2%;
      padding: 3%;

      h2 {
         font-size: 1.8rem;
         margin-bottom: 10%;
      }

      form {
         label {
            font-size: 1.3rem;
         }

         .name, textarea {
            width: 98%;
            font-size: 1.3rem;
            margin-bottom: 5%;
         }

         .price, .inventory {
            width: 20%;
            font-size: 1.3rem;
            margin-bottom: 5%;
         }
      }
      
      .div-images {
         li {
            margin: 8% 0;
            img {
               width: 85%;
            }
         }
      }

      .images-container {
         button {
            width: 70%;
            font-size: 1.3rem;
         }
      }

      .add {
         font-size: 1.3rem;
         margin-bottom: 8%;
      }

      .submit {
         display: flex;
         justify-content: end;
         font-size: 1.3rem;
      }
   }
`;