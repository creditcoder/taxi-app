import React from "react";
import Helmet from "react-helmet";
import { Link, RouteComponentProps } from "react-router-dom";
import { fadeIn } from "../../animations";
import { BlueButton, VioletButton } from "../../Components/Button";
import { Layout } from "../../Components/Container";
import styled from "../../typed-components";

const Header = styled.header`
  height: 70%;
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
  animation: ${fadeIn} 1s ease;
  border-radius: 50px;
  box-shadow: 0 14px 28px rgba(255, 255, 255, 0.25),
    0 -14px 28px rgba(255, 255, 255, 0.22);
  text-transform: uppercase;
  color: ${props => props.theme.violetColor};
  font-weight: 900;
  font-size: 40px;
`;

const Title = styled.h1``;

const Footer = styled.div`
  width: 80%;
  max-width: 700px;
  margin: 0 auto;
  animation: ${fadeIn} 1s ease-in-out;
  box-shadow: 0 14px 28px rgba(255, 255, 255, 0.25),
    0 -14px 28px rgba(255, 255, 255, 0.22);
  border-radius: 10px;
  background-color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Subtitle = styled.h2`
  margin: 20px 0;
  font-size: 25px;
  color: ${props => props.theme.violetColor};
`;

const BlueButtonExtended = styled(BlueButton)`
  width: 240px;
  margin: 20px 0;
`;

const VioletButtonExtended = styled(VioletButton)`
  width: 240px;
`;

// tslint:disable-next-line:no-empty-interface
interface IProps {}

const LoginPresenter: React.FC<RouteComponentProps<IProps>> = () => (
  <Layout>
    <Helmet>
      <title>Login | Taxi</title>
    </Helmet>
    <Header>
      <Logo>
        <Title>Taxi</Title>
      </Logo>
    </Header>
    <Footer>
      <Subtitle>Start moving with Taxi</Subtitle>
      <Link to={"/phone-login"}>
        <VioletButtonExtended onClick={null}>
          Log in with phone
        </VioletButtonExtended>
      </Link>
      <Link to={"/social-login"}>
        <BlueButtonExtended onClick={null}>
          Or connect with social
        </BlueButtonExtended>
      </Link>
    </Footer>
  </Layout>
);

export default LoginPresenter;
