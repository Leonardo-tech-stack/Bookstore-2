import styled from 'styled-components';
import Modal from "../../assets/images/lampada.png";

export const Li = styled.li`
  width: 85%;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  margin-top: -130px;

  a {
    width: 35%;
    margin: 6% 5%;
    border-bottom: 1px solid white;
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    margin-top: -115px;
    a {
      width: 60%;
    }
  }
`;

export const Logout = styled.button`
  margin: 6% 5%;
  border-bottom: 1px solid white;
`;

export const Login = styled.button`
  margin: 6% 5%;
  border-bottom: 1px solid white;
`;

export const ArrowButton = styled.button`
  width: 12%;
  background-color: #0d0d0d;
  color: white;
  padding: 0.2% 0.6%;
  
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 65%;
    padding: 4% 2%;
  }
`;

export const ModalContent = styled.div<{ isOpen: boolean }>`
  /* background-color: #0d0d0d; */
  background-image: url(${Modal});
  background-position: center;
  background-size: cover;
  color: white;
  width: 30vw;
  height: 100vh;
  transition: left 0.5s;
  position: absolute;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  
  .back {
    margin-left: 91%;
    margin-top: 20%;
    border: 1px solid white;
    padding: 15px 20px;
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 100vw;

    .back {
      margin-left: 88%;
    }
  }
`;

