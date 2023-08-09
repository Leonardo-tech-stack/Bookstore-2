import styled from "styled-components";
import { lighten } from 'polished';
import { colors } from '../../../styles/themes';

export const Flex = styled.div`
display: flex;
justify-content: space-evenly;
margin-left: -20%;
overflow-y: hidden;

img {
    width: 210px;
    height: 250px;
    margin-top: 90%;
}

@media only screen and (min-width: 320px) and (max-width: 480px) {
    img {
        display: none;
    }
}

@media only screen and (min-width: 481px) and (max-width: 768px) {
    img {
        display: none;
    }
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

@media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 85%;
    margin-top: 8%;
    margin-bottom: 12%;
    margin-left: 20%;
}

@media only screen and (min-width: 481px) and (max-width: 768px) {
    width: 85%;
    margin-top: 8%;
    margin-bottom: 12%;
    margin-left: 20%;
}
`;

export const Title = styled.h2`
margin-bottom: 9%;
font-size: 1.6rem;
font-weight: 500;

@media only screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 1.1rem;
    margin: 12% 0;
    margin-top: 8%;
}

@media only screen and (min-width: 481px) and (max-width: 768px) {
    font-size: 1.7rem;
    margin: 12% 0;
    margin-top: 8%;
}
`;

export const Form = styled.form`
width: 80%;
margin-top: 5%;
margin-right: 10%;

div {
    margin: 1% 0;
}

input, label {
    margin: 1% 0;
}

input {
    width: 85%;
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

.button {
    display: flex;
    justify-content: end;
    
    button {
        padding: 6px 15px;
        margin: 7% 0;
        margin-right: 5%;
        color: white;
        /* background-color: #17a99b; */
        background-color: ${colors.principal};
        border-radius: 30px;

        &:hover {
            transition: 0.5s;
            background-color: ${props => lighten(0.11, colors.principal)};
        }
    }
}


@media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 0;
    margin: 5% 10%;

    label {
        display: none;
    }

    input {
        width: 100%;
        margin: 5% 0;
    }

    .button {
        button {
            margin-right: 0;
        }
    }

}

@media only screen and (min-width: 481px) and (max-width: 768px) {
    width: 100%;
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 0;
    margin: 5% 10%;

    label {
        display: none;
    }

    input {
        width: 100%;
        height: 50px;
        font-size: 1.3rem;
        margin: 5% 0;
    }

    .button {
        button {
            font-size: 1.3rem;
            margin-right: 0;
        }
    }
}

`;
