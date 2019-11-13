import React from "react";
import Helmet from "react-helmet";
import BackArrow from "../../Components/BackArrow";
import Input from "../../Components/Input";
import countries from "../../countries";
import { Layout } from "../../global-styles";
import styled from "../../typed-components";

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

const PhoneLoginPresenter = () => (
  <Layout>
    <FlexContainer>
      <Container>
        <Helmet>
          <title>Phone Login | Taxi</title>
        </Helmet>
        <BackArrow backTo={"/"} />
        <h1>Enter your mobile number</h1>
        <select>
          {countries.map((country, index) => (
            <option key={index} value={country.dial_code}>
              {country.flag} {country.name} ({country.dial_code})
            </option>
          ))}
        </select>
        <form>
          <Input placeholder={"050 000 00 00"} />
        </form>
      </Container>
      >
    </FlexContainer>
  </Layout>
);

export default PhoneLoginPresenter;
