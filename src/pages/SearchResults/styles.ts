import styled from "styled-components";
import { lighten } from 'polished';
import { colors } from '../../styles/themes';

export const NFound = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 12% 0;

    p {
        margin: 2% 0;
    }

    .n-1 {
        font-size: 1.3rem;
        color: ${colors.bgButton}
    }

    .n-2 {
        font-size: 1.5rem;
        a {
            &:hover {
                text-decoration: underline;
            }
        }
    }

    @media only screen and (min-width: 320px) and (max-width: 480px) {
        margin: 12% 1%;
        text-align: center;

        .n-1 {
            font-size: 1rem;
            margin-bottom: 11%;
        }

        .n-2 {
            font-size: 1.2rem;
        }
    }
`;