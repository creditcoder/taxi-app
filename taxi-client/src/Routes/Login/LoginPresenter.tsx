import React from "react";
import { RouteComponentProps } from "react-router-dom";
import bgImage from "../../images/bg.jpg";
import styled from "../../typed-components";

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.header`
  height: 70%;
  background: url(${bgImage}) center no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  width: 150px;
  height: 150px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  box-shadow: 0 14px 28px rgba(255, 255, 255, 0.25), 0 -14px 28px rgba(255, 255, 255, 0.22);
  text-transform: uppercase;
  color: ${props => props.theme.violetColor};
  font-family: 'Jura', sans-serif;
  font-weight: 900;
  font-size: 40px;
`;

const Title = styled.h1``;

interface IProps {
  isLoggedIn: string;
}

const LoginPresenter: React.FC<RouteComponentProps<IProps>> = () => (
  <Container>
    <Header>
      <Logo>
        <Title>Taxi</Title>
      </Logo>
    </Header>
  </Container>
);

export default LoginPresenter;
