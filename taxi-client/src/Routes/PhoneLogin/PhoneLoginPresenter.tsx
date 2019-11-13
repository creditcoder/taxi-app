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
  min-height: 400px;
  background-color: white;
  box-shadow: 0 14px 28px rgba(255, 255, 255, 0.25),
    0 -14px 28px rgba(255, 255, 255, 0.22);
  padding: 50px 20px;
  border-radius: 10px;
`;

const BackArrowLeftTop = styled(BackArrow)`
  position: absolute;
  top: 20px;
  left: 20px;
`;
const Title = styled.h2`
  font-size: 25px;
  margin-bottom: 40px;
`;

const Form = styled.form``;

const Button = styled.a`
  box-shadow: 0 5px 10px ${props => props.theme.violetColor};
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  right: 30px;
  cursor: pointer;
  margin: 5px 0 10px 0;
  transition: .2s
  &:hover{
    margin: 0 0 15px 0;
  }
`;

const PhoneLoginPresenter = () => (
  <Layout>
    <FlexContainer>
      <Container>
        <Helmet>
          <title>Phone Login | Taxi</title>
        </Helmet>
        <BackArrowLeftTop backTo={"/"} />
        <Title>Enter your mobile number</Title>
        <select>
          {countries.map((country, index) => (
            <option key={index} value={country.dial_code}>
              {country.flag} {country.name} ({country.dial_code})
            </option>
          ))}
        </select>
        <Form>
          <Input placeholder={"050 000 00 00"} />
          <Button>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 24 24"
              fill="#5b0c75"
            >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19l-1.782-1.75 5.25-5.25-5.25-5.25 1.782-1.75 6.968 7-6.968 7z"/>
            </svg>
          </Button>
        </Form>
      </Container>
      >
    </FlexContainer>
  </Layout>
);

export default PhoneLoginPresenter;
