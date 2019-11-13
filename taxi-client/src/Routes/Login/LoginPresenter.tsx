import React from "react";
import Helmet from "react-helmet";
import { Link, RouteComponentProps } from "react-router-dom";
import bgImage from "../../images/bg.jpg";
import styled from "../../typed-components";

const Container = styled.div`
  height: 100vh;
  background: url(${bgImage}) center no-repeat;
`;

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
  box-shadow: 0 14px 28px rgba(255, 255, 255, 0.25),
    0 -14px 28px rgba(255, 255, 255, 0.22);
  border-radius: 10px;
  background-color: white;
  text-align: center;
`;

const Subtitle = styled.div`
  font-size: 25px;
  color: ${props => props.theme.violetColor};
`;

const FakeInput = styled.div`
  margin: 30px 0 15px 0;
  font-size: 20px;
  font-weight: 300;
`;

const PhoneLogin = styled.div`
  padding: 20px;
`;

const Grey = styled.span`
  color: ${props => props.theme.greyColor};
  margin-left: 10px;
`;

const SocialLogin = styled.button`
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 20px;
  transition: .2s;
  &:hover{
    margin-top: 0;
    margin-bottom: 25px;
  }
  box-shadow: 0 5px 10px ${props => props.theme.violetColor};
  border: 2px solid ${props => props.theme.violetColor};
  border-radius: 20px;
  padding: 15px 10px;
  background-color: transparent;
`;

const SocialLink = styled.span`
  font-family: 'Jura', sans-serif;
  color: ${props => props.theme.violetColor};
  font-weight: 600;
  font-size: 16px;
`;

// tslint:disable-next-line:no-empty-interface
interface IProps {}

const LoginPresenter: React.FC<RouteComponentProps<IProps>> = () => (
  <Container>
    <Helmet>
      <title>Login | Taxi</title>
    </Helmet>
    <Header>
      <Logo>
        <Title>Taxi</Title>
      </Logo>
    </Header>
    <Footer>
      <Link to={"/phone-login"}>
        <PhoneLogin>
          <Subtitle>Start moving with Taxi</Subtitle>
          <FakeInput>
            +38 <Grey>Enter your mobile phone</Grey>
          </FakeInput>
        </PhoneLogin>
      </Link>
      <Link to={"/social-login"}>
        <SocialLogin>
          <SocialLink>Or connect with social</SocialLink>
        </SocialLogin>
      </Link>
    </Footer>
  </Container>
);

export default LoginPresenter;
