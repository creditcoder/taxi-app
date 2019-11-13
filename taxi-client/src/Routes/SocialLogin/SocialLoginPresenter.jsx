import React from "react";
import Helmet from "react-helmet";
import BackArrow from "../../Components/BackArrow";
import styled from "../../typed-components";

const Container = styled.div`
  margin-top: 30px;
  padding: 50px 20px;
`;

const SocialLoginPresenter = () => (
  <Container>
    <Helmet>
      <title>Social Login | Taxi</title>
    </Helmet>
    <BackArrow backTo={"/"} />
  </Container>
);

export default SocialLoginPresenter;
