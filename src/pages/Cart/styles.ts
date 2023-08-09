import styled from 'styled-components';
import { lighten } from 'polished';
import { colors } from '../../styles/themes';

export const Body = styled.div`
    margin-bottom: 12%;

    @media only screen and (min-width: 320px) and (max-width: 480px) {
        margin-bottom: 45%;
    }

    @media only screen and (min-width: 481px) and (max-width: 768px) {
        margin-bottom: 55%;
    }
`;

export const Titulo = styled.div`

    h2 {
        font-size: 1.6rem;
        font-weight: 600;
        margin: 2%;
    }

    @media only screen and (min-width: 320px) and (max-width: 480px) {
        h2 {
            margin-top: 6%;
            margin-left: 4%;
        }
    }

    @media only screen and (min-width: 481px) and (max-width: 768px) {
        h2 {
            font-size: 1.8rem;
            margin-top: 6%;
            margin-left: 4%;
        }
    }
`;

export const Voltar = styled.div`

    a {
        font-size: 1.1rem;
        margin-left: 2%;

        &:hover {
            text-decoration: underline;
            font-weight: 600;
        }
    }

    @media only screen and (min-width: 320px) and (max-width: 480px) {
        width: 100vw;
        text-align: center;
        margin-top: 15%;

        a {
            font-size: 1rem;
            text-decoration: underline;
            font-weight: 600;
        }
    }

    @media only screen and (min-width: 481px) and (max-width: 768px) {
        text-align: center;
        margin-top: 10%;

        a {
            font-size: 1.3rem;
            text-decoration: underline;
            font-weight: 600;
        }
    }
`;

export const DivFlex = styled.div`
  display: flex;

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
    margin-top: 8%;
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) {
    flex-direction: column;
    margin-top: 8%;
  }
`;


export const Vazio = styled.div`
  text-align: center;
  padding: 7% 0%;

  p {
    font-size: 2rem;
    margin-bottom: 4%;
  }

  a {
    border: none;
    font-weight: 500;

    button {
        padding: 10px 60px;
        border: none;
        background-color: ${colors.principal};
        color: #fff;
        font-size: 1.6rem;

        &:hover {
            transition: 0.5s;
            background-color: ${props => lighten(0.07, colors.principal)};
            cursor: pointer;
        }
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    margin-top: 15%;

    p {
        font-size: 1.4rem;
        margin-bottom: 15%;
    }

    a {
        button {
        padding: 5px 10px;
        font-size: 1.5rem;
        }
    }
  }

`;

export const Div = styled.div`
    border-bottom: 1px solid #f1f1f1;
    margin: 2%;
    margin-left: 5%;

    .remove {
        display: flex;
        justify-content: right;

        button {
            padding: 2px 14px;
            margin-bottom: 2%;
            font-weight: 500;

            &:hover {
                box-shadow: 0px 2px 4px #000;
                border-radius: 8px;
                color: red;
            }    
        }
    }

    @media only screen and (min-width: 320px) and (max-width: 480px) {
        display: flex;
        flex-direction: column;
        margin-bottom: 15%;
    }

    @media only screen and (min-width: 481px) and (max-width: 768px) {
        margin-bottom: 10%;

        .remove {
            button {
                font-size: 1.3rem;
            }
        }
    }
`;

export const Detalhes = styled.section`
  height: 25rem;
  flex-direction: column;
  background-color: #d3d3d3;
  margin-top: 2%;
  margin-left: 25%;

  .details {
    text-align: start;
    margin-left: 2rem;
    margin-top: 2rem;

    h3 {
        font-size: 1.563rem;
        padding-bottom: 9%;
        margin-bottom: 9%;
        width: 91%;
        border-block-end: 1px solid #f1f1f1;
    }
    p {
        width: 91%;
        margin-top: 10%;
        margin-bottom: 8.5%;
        padding: 8% 0;
        border-block-end: 1px solid #f1f1f1;
        border-top: 1px solid #f1f1f1;
    }
    b {
        font-size: 1.5rem;

        span {
            margin-left: 50%;
        }
    }
  }

  .checkout {
    margin-top: 20%;

    button {
        font-size: 1rem;
        font-weight: 900;
        padding: 1.5rem 8.75rem;
        border: none;
        background-color: ${colors.principal};
        color: white;

        &:hover {
            transition: 0.5s;
            background-color: ${props => lighten(0.07, colors.principal)};
            cursor: pointer;
        }
    }
  }

    @media only screen and (min-width: 320px) and (max-width: 480px) {
        width: 90%;
        height: 25rem;
        margin-left: 0;
        margin: 0 5%;

        .details {
            b {
                padding-top: 55%;
                span {
                    margin-left: 31%;
                }
            }
        }

        .checkout {
            width: 100%;

            button {
                width: 100%;
                padding: 6% 28.2%;
                margin-top: 5%;
                white-space: nowrap;
            }
        }
    }

    @media only screen and (min-width: 481px) and (max-width: 768px) {
        width: 90%;
        height: 620px;
        margin: 0 5%;

        .details {
            h3 {
                font-size: 2.3rem;
            }

            p {
                font-size: 1.6rem;
            }

            b {
                font-size: 2rem;

                span {
                    margin-left: 43%;
                }
            }
        }

        .checkout {
            width: 100%;

            button {
                width: 100%;
                font-size: 1.5rem;
                padding: 6% 28.2%;
                margin-top: 5%;
                white-space: nowrap;
            }
        }
    }
`;

export const Ul = styled.ul`
    font-size: 1rem;

    li {
        display: flex;
        flex-direction: row;
        padding: 2% 0;

        p {
           margin-bottom: 0.7%;
        }
    }

    img {
        width: 6rem;
        height: 6rem;
        border: 1px solid ${colors.bgButton};
        border-radius: 15px;
    }

    .strings {
        width: 35vw;
        margin-left: 1%;

        button {
            background-color: ${colors.fundo};
            padding: 2px 8px;
            padding-top: 1px;
            border: 1px solid ${colors.bgButton};
            border-radius: 5px;
        }

        .less { 
            padding: 2px 10px;
            padding-top: 1px;
            margin-left: 1%;
        }

        span {
            margin: 0 1.5%;
        }
    }

    @media only screen and (min-width: 320px) and (max-width: 480px) {
        li {
            width: 100vw;
            flex-direction: column;
        }

        img {
            margin-bottom: 5%;
        }

        P {
            margin: 1% 0;
        }

        .strings {
            width: 92vw;
        }
    }

    @media only screen and (min-width: 481px) and (max-width: 768px) {
        li {
            width: 100vw;
            flex-direction: column;
            font-size: 1.3rem;
        }

        img {
            width: 9rem;
            height: auto;
            margin-bottom: 5%;
        }

        P {
            margin: 1% 0;
        }

        .strings {
            width: 92vw;
        }
    }
`;