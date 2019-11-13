import React from "react";
import Helmet from "react-helmet";
import BackArrow from "../../Components/BackArrow";
import styled from "../../typed-components";
import { Layout } from "../../global-styles";
import bgImage from "../../images/bg.jpg";

const FlexContainer = styled.div`
  width: 80%;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  box-shadow: 0 14px 28px rgba(255, 255, 255, 0.25),
    0 -14px 28px rgba(255, 255, 255, 0.22);
  padding: 50px 20px;
  border-radius: 10px;
`;

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
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const BackArrowLeftTop = styled(BackArrow)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const SocialLoginPresenter = () => (
  <Layout>
    <FlexContainer>
      <Container>
        <Helmet>
          <title>Social Login | Taxi</title>
        </Helmet>
        <Title>Choose an account</Title>
        <BackArrowLeftTop backTo={"/"} />
        <Link>
          <Icon>
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24"
            fill="#344EA1"
            >
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
            </svg>
          </Icon>
          Facebook
        </Link>
      </Container>
    </FlexContainer>
  </Layout>
);

export default SocialLoginPresenter;