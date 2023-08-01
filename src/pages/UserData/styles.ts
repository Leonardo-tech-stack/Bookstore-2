import styled from "styled-components";
import { lighten } from 'polished';
import { colors } from '../../styles/themes';

export const Flex = styled.div`
display: flex;
justify-content: space-evenly;
margin-left: -20%;

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
    width: 75%;
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
    font-size: 1.4rem;
    margin: 12% 0;
    margin-top: 8%;
    margin-left: 5%;
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
    margin: 5% 10%;
    margin-left: 4%;

    label {
        margin: 5%;
        margin-right: 0;
    }

    input {
        width: 65%;
        margin: 5% 2%;
    }

    .button {
        button {
            margin-right: 0;
        }
    }

}
`;

export const Alternate = styled.div`
    display: flex;
    justify-content: space-around;

    .button {
        display: flex;
        align-items: center; 

        .update {
            margin-right: 40%;
        }

        .delete {
            margin-right: -15%;
        }

        button {
            padding: 6px 30px;
            margin-right: 5%;
            color: white;
            background-color: ${colors.principal};
            border-radius: 30px;
            white-space: nowrap;

            &:hover {
                transition: 0.5s;
                background-color: ${props => lighten(0.11, colors.principal)};
            }

        }
    }

    @media only screen and (min-width: 320px) and (max-width: 480px) {

        .button {
            flex-direction: column;
            justify-content: center;
            margin-top: 11%;

            .update {
                margin-right: 0;
            }

            .delete {
                margin-right: 0;
            }

            button {
                padding: 6px 20px;
                margin-right: 5%;
                color: white;
                background-color: ${colors.principal};
                border-radius: 30px;
                white-space: nowrap;

                &:hover {
                    transition: 0.5s;
                    background-color: ${props => lighten(0.11, colors.principal)};
                }

            }
        }
    }
`;