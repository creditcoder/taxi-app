import React from "react";
import Helmet from "react-helmet";
import { Link, RouteComponentProps } from "react-router-dom";
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
  box-shadow: 0 14px 28px rgba(255, 255, 255, 0.25),
    0 -14px 28px rgba(255, 255, 255, 0.22);
  text-transform: uppercase;
  color: ${props => props.theme.violetColor};
  font-weight: 900;
  font-size: 40px;
`;

const Title = styled.h1``;

const Footer = styled.div`
  text-align: center;
`;

const Subtitle = styled.div`
  font-size: 30px;
`;

const FakeInput = styled.div`
  margin: 50px 0;
  font-size: 25px;
  font-weight: 300;
`;

const PhoneLogin = styled.div`
  padding: 20px;
`;

const Grey = styled.span`
  color: ${props => props.theme.greyColor};
  margin-left: 10px;
`;

const SocialLogin = styled.div`
  border-top: 1px solid ${props => props.theme.greyColor};
  padding: 30px 20px;
`;

const SocialLink = styled.span`
  color: ${props => props.theme.blueColor};
  font-size: 20px;
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
