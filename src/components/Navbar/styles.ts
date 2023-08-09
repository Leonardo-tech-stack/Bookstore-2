import styled from "styled-components";

export const StyledIconWrapper = styled.div<{ itemCount: number }>`
  position: relative;
  padding: ${({ itemCount }) => (itemCount > 0 ? '3px 35px 3px 6px' : '0')};

  a {
    text-decoration: none;
  }
`;


export const Input = styled.input`
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    width: 140px;
  }
`;