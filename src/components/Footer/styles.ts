import styled from "styled-components";
import { lighten } from 'polished';
import { colors } from '../../styles/themes';

export const Footer1 = styled.div`

.subs {
  &:hover {
    transition: 0.5s;
    background-color: ${props => lighten(0.11, colors.principal)};
  }
}
`