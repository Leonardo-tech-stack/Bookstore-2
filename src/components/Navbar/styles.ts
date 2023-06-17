import styled from "styled-components";
import Link from '../Link';
import { colors } from '../../styles/themes'

export const StyledIconWrapper = styled.div`
  padding: 3px 35px 3px 6px;
  position: relative;
  a {
    text-decoration: none;
  }
`;

export const CartItemCount = styled.span<{ itemCount: number }>`
  position: absolute;
  top: 0px;
  right: 5px;
  background-color: ${colors.bgButton};
  color: #fff;
  border-radius: 50%;
  padding: ${({ itemCount }) => (itemCount > 9 ? '2px 4px' : '2px 9px')};
  left: ${({ itemCount }) => (itemCount > 9 ? '31px' : '33px')};
`;

export const Login = styled(Link)`
  color: white;
  padding: 10px 11px;
`