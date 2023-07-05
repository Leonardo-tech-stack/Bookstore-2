import styled from "styled-components";
import { lighten } from 'polished';
import { colors } from '../../styles/themes';

export const Div = styled.div`
  display: flex;
  justify-content: center;
  width: 65%;
  min-height: 25rem;
  margin: 5%;
  margin-right: 0;

  img {
    width: 25rem;
    height: 25rem;
    border: 1px solid ${colors.bgButton};
    border-radius: 35px;
  }

  .string {
    margin-left: 7%;
  }

  h1 {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 5%;
  }

  p {
    margin: 1% 0;
  }

  .hide { 
    font-weight: 600;
    
    &:hover {
      outline: none;
      box-shadow: 0px 2px 4px #000;
      border-radius: 35px;
      padding: 1px 4px;
    }
  }

  .add {
    margin-top: 2%;
    padding: 5px 15px;
    background-color: ${colors.principal};
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
    border-radius: 9px;

    &:hover {
      transition: 0.5s;
      background-color: ${props => lighten(0.11, colors.principal)};
    }
  }
`;

interface DescriptionProps {
  showFullDescription: boolean;
}

export const Description = styled.p<DescriptionProps>`
  width: 75%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  ${({ showFullDescription }) => showFullDescription && `
    -webkit-line-clamp: unset;
  `}
`;