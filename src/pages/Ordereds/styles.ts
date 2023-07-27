import styled from "styled-components";
import { lighten } from 'polished';
import { colors } from "../../styles/themes";

export const Body = styled.div`
    margin-bottom: 5%;
`;

export const Title = styled.h2`
    display: flex;
    justify-content: center;
    margin: 3% 0;

    h2 {
        font-size: 1.6rem;
        font-weight: 500;
    }
`;

export const Pedidos = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: baseline;
    /* width: 85%; */

    .all {
        display: flex;
        flex-direction: column;
        font-size: 1.1rem;
        width: 40rem;
        background-color: ${colors.fundo};
        margin: 2% 1%;
        border: 1px solid ${colors.bgButton};
        border-radius: 15px;

        .info {
            display: flex;
            justify-content: center;
            background-color: ${colors.titulo};
            border-radius: 10px 10px 0 0;
            border: 10px 10px 0px 0px solid ${colors.bgButton};

            p { 
                margin: 2%;
            }
        }
    }

    table {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        border-top: 1px solid ${colors.bgButton};

        thead {

            tr {
               display: flex;
               justify-content: start;

                th { 
                    padding: 10px 5px;
                    width: 100%;
                    border-bottom: 1px solid ${colors.bgButton};
                }
            }
        }

        td {
            font-weight: 500;
            width: 100%;
            padding: 12px 70px;
            border-bottom: 1px solid ${colors.bgButton};

            b {
                
            }
        }
    }

    .img {
        width: 24%;
        padding: 10px 0 10px 30px;
        
        img {
            padding: 10px;
            border-radius: 15px;
        }
    }

    .name {
        position: relative;
        right: -8%;
        width: 26%;
        padding: 10px 5px 10px 0px;
    }

    .price {
        width: 25%;
        padding: 10px 80px 10px 80px;
    }

    .quantity {
        width: 25%;
        padding: 10px 0px 10px 50px;
    }

    .cancel {
        display: flex;
        justify-content: end;
        margin: 2% 0;

        button {
            width: 25%;
            padding: 6px;
            margin-right: 3%;
            font-weight: 500;
            color: white;
            background-color: ${colors.warning};   
            /* background-color: ${colors.principal}; */
            border-radius: 10px;

            &:hover {
                transition: 0.5s;
                background-color: ${props => lighten(0.11, colors.warning)};
            }
        }
    } 
`;

export const Margin = styled.div`
    margin: 4% 0;
`;

export const Vazio = styled.div`
  text-align: center;
  padding: 7% 0%;

  p {
    font-size: 2rem;
    margin-bottom: 15%;
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
        margin-bottom: 15%;

        &:hover {
            transition: 0.5s;
            background-color: ${props => lighten(0.07, colors.principal)};
            cursor: pointer;
        }
    }
  }
`;