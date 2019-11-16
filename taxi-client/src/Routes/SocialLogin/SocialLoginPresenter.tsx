import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Helmet from "react-helmet";
import { rotate } from "../../animations";
import BackArrow from "../../Components/BackArrow";
import Layout from "../../Components/Container";
import styled, { css } from "../../typed-components";

const Title = styled.h2`
  color: ${props => props.theme.violetColor};
  font-size: 25px;
  margin-bottom: 40px;
`;

const Link = styled.a`
  margin-left: 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
`;

const Icon = styled.span`
  margin-right: 10px;
  animation: ${props =>
    props.loading
      ? css`
          ${rotate} 2s linear infinite
        `
      : "none"};
`;

const BackArrowLeftTop = styled(BackArrow)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

interface IProps {
  loginCallback: (response) => void;
  loading: boolean;
}

const SocialLoginPresenter: React.FC<IProps> = ({ loginCallback, loading }) => (
  <Layout padding={"50px 20px"} textAlign={"center"}>
    <Helmet>
      <title>Social Login | Taxi</title>
    </Helmet>
    <Title>Choose an account</Title>
    <BackArrowLeftTop backTo={"/"} />
    <FacebookLogin
      appId="421081915185732"
      autoLoad={false}
      fields="name,first_name,last_name,email"
      onClick={null}
      callback={loginCallback}
      render={renderProps => (
        <Link onClick={renderProps.onClick}>
          <Icon loading={loading}>
            {loading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="#5b0c75"
              >
                <path d="M14 22c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm-2-22c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 10c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm-22 2c0 1.105.896 2 2 2s2-.895 2-2c0-1.104-.896-2-2-2s-2 .896-2 2zm19-9c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm0 14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm-14-14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm0 14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#344EA1"
              >
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            )}
          </Icon>
          {loading ? "" : "Facebook"}
        </Link>
      )}
    />
  </Layout>
);

export default SocialLoginPresenter;
