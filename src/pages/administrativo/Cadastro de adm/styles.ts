import styled from "styled-components";
import { colors } from '../../../styles/themes';


export const Flex = styled.div`
display: flex;
justify-content: space-evenly;
margin-left: -20%;

img {
    width: 210px;
    height: 250px;
    margin-top: 90%;
}
`;

export const Div = styled.div`
display: flex;
justify-content: center;
width: 30%;
min-height: 400px;
margin: 5%;
margin-left: -15%;
border: 1px solid ${colors.bgButton};
border-radius: 35px;
`;

export const Title = styled.h2`
margin-bottom: 9%;
font-size: 1.6rem;
font-weight: 500;
`;

export const Form = styled.form`
width: 80%;
margin-top: 5%;

div {
    margin: 1% 0;
}

input, label {
    margin: 1% 0;
}

input {
    width: 80%;
    margin-left: 1.5%;
    padding: 0.6% 1.4%;
    border: 1px solid ${colors.bgButton};
    border-radius: 5px;
    :focus {
        outline: none;
        box-shadow: 0px 2px 4px #000;
    }
}

label {
    font-weight: 600;
}

button {
    padding: 6px 15px;
    margin: 7% 0;

    color: white;
    background-color: #17a99b;
    border-radius: 30px;
}
`;
