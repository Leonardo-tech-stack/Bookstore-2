import styled from "styled-components";
import { colors } from '../../styles/themes'

export const DivEditProduct = styled.div`
   margin: 3% 9%;
   padding: 2% 3%;
   border: 1px solid ${colors.bgButton};
   border-radius: 35px;

   h1 {
      font-size: 1.6rem;
      font-weight: 600;
   }

   div {
      margin: 3% 0;
   }

   label, input {
      font-weight: 600;
   }

   button {
      padding: 6px 15px;
      margin: 2% 0;
      color: white;
      background-color: #17a99b;
      border-radius: 30px;
   }
`;