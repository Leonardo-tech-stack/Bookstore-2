import styled from 'styled-components';
import Modal from "../../assets/images/lampada.png";

export const Li = styled.li`
  width: 85%;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  margin-top: -110px;

  a {
    width: 65%;
    font-size: 1.1rem;
    margin: 8% 5%;
    border-bottom: 1px solid white;
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 95%;
    margin-top: -115px;

    a {
      width: 60%;
    }
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) {
    font-size: 1.3rem;
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
  width: 18%;
  background-color: #0d0d0d;
  color: white;
  padding: 0.8% 0.6%;
  
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 65%;
    padding: 4% 2%;
  }

  @media only screen and (min-width: 481px) and (max-width: 768px) {
    width: 55%;
    font-size: 1.3rem;
    padding: 2%;
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
    margin-left: 83%;
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

  @media only screen and (min-width: 481px) and (max-width: 768px) {
    width: 481px;

    .back {
      margin-left: 90%;
      padding: 20px 25px;
    }
  }

`;

