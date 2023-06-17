import styled from "styled-components";
import { colors } from '../../styles/themes'

export const Div = styled.div`
margin: 2%;
border: 1px solid ${colors.bgButton};
border-radius: 35px;
`;

export const Title = styled.h2`
margin: 2% 0;
margin-left: 5%;
font-size: 1.6rem;
font-weight: 500;
`;

export const Form = styled.form`
margin-left: 5%;
div {
    margin: 1% 0;
}

input {
    margin-left: 0.5%;
}

input, label {
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