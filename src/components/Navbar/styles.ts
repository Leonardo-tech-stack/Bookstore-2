import styled from "styled-components";
import Link from '../../types/Link';
import { colors } from '../../styles/themes'

export const StyledIconWrapper = styled.div<{ itemCount: number }>`
  position: relative;
  padding: ${({ itemCount }) => (itemCount > 0 ? '3px 35px 3px 6px' : '0')};

  a {
    text-decoration: none;
  }
`;
