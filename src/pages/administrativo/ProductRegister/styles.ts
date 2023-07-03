import styled from "styled-components";
import { lighten } from "polished";
import { colors } from '../../../styles/themes';

export const Flex = styled.div`
display: flex;
justify-content: space-between;
width: 80%;
margin: 4% 0;
margin-left: 10%;

img {
    width: 70%;
    height: 70%;
    margin-left: -25%;
    margin-top: 21%;
}
`;

export const Div = styled.div`
width: 70%;
height: 630px;
margin-left: -15%;
margin-right: 10%;
border: 1px solid ${colors.bgButton};
border-radius: 35px;
`;

export const Title = styled.h2`
margin: 5% 0% 6% 5%;
font-size: 1.6rem;
font-weight: 500;
`;

export const DiVCadastroProduto = styled.div`
margin: 2%;
border: 1px solid ${colors.bgButton};
border-radius: 35px;

h1 {
    font-size: 1.6rem;
    font-weight: 500;
    margin: 2% 0 2% 5%;
}
`;

export const Form = styled.form`

label {
    margin: 1% 0;
    margin-left: 5%;
    font-weight: 600;
}

textarea {
    padding: 0.7% 0;
}

input, textarea {
    margin: 1% 0;
    margin-left: 0.5%;
    padding-left: 0.7%;
    height: 3vh;
    width: 80vw;
    font-size: 1rem;
    border: 1px solid ${colors.bgButton};
    border-radius: 5px;
    :focus {
        outline: none;
        box-shadow: 0px 2px 4px #000;
    }
}

button {
    padding: 6px 15px;
    margin: 2% 0;
    margin-left: 5%;
    color: white;
    background-color: ${colors.principal};
    border-radius: 30px;

    &:hover {
      transition: 0.5s;
      background-color: ${props => lighten(0.11, colors.principal)};
    }
}

#name {
    width: 38vw;
    margin-left: 2.8%;
}

#description {
    width: 38vw;
    height: 10vh;
    margin-left: 0.5%;
    font-size: 1rem;
}

#price {
    width: 5vw;
    margin-left: 3.2%;
}

#inventory {
    width: 5vw;
    margin-left: 1.6%;
}

.textarea-label {
    position: relative;
    top: -75px;
}

.img-label {
    position: relative;
    top: 18px;
}

#images {
    position: relative;
    top: -18px;
    padding-bottom: 2%;
    margin-left: 11.8%;
    border: none;
}
`;