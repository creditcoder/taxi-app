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

interface IProps {
  isLoggedIn: string;
}

const LoginPresenter: React.FC<RouteComponentProps<IProps>> = () => (
  <Container>
    <Header>
      Taxi
    </Header>
  </Container>
);

export default LoginPresenter;
