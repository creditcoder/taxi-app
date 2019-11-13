import PropTypes from "prop-types";
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
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 330px;
  background-color: white;
  box-shadow: 0 14px 28px rgba(255, 255, 255, 0.25),
    0 -14px 28px rgba(255, 255, 255, 0.22);
  padding: 50px 20px;
  border-radius: 10px;
  text-align: center;
`;

const BackArrowLeftTop = styled(BackArrow)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Title = styled.h2`
  color: ${props => props.theme.violetColor};
  font-size: 25px;
  margin: 20px 0 40px 0;
  text-align: center;
`;

const Subtitle = styled.label`
  color: ${props => props.theme.violetColor};
  font-size: 16px;
  margin-right: 5px;
`;

const Form = styled.form`
  display: inline-block;
`;

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
  transition: 0.2s;
  &:hover {
    margin: 0 0 15px 0;
  }
`;

const CountrySelect = styled.select`
  font-size: 16px;
  color: "#2c3e50";
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
  border: 0;
  margin-bottom: 20px;
  margin-right: 10px;
  max-width: 210px;
  font-family: "Jura", sans-serif;
`;

const CountryOption = styled.option`
  &:nth-child(odd) {
    background-color: ${props => props.theme.violetColor};
    color: white;
  }
  &:nth-child(even) {
    color: ${props => props.theme.violetColor};
  }
`;

interface IProps {
  countryCode: string;
  phoneNumber: string;
}

const PhoneLoginPresenter: React.FC<IProps> = ({
  countryCode,
  phoneNumber
}) => (
  <Layout>
    <FlexContainer>
      <Container>
        <Helmet>
          <title>Phone Login | Taxi</title>
        </Helmet>
        <BackArrowLeftTop backTo={"/"} />
        <Title>Enter your mobile number</Title>
        <Subtitle>Select country:</Subtitle>
        <CountrySelect value={countryCode}>
          {countries.map((country, index) => (
            <CountryOption key={index} value={country.dial_code}>
              {country.flag} {country.name} ({country.dial_code})
            </CountryOption>
          ))}
        </CountrySelect>
        <Form>
          <Subtitle>Number:</Subtitle>
          <Input width="170px" type="number" placeholder={"050 000 00 00"} value={phoneNumber}/>
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="#5b0c75"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19l-1.782-1.75 5.25-5.25-5.25-5.25 1.782-1.75 6.968 7-6.968 7z" />
            </svg>
          </Button>
        </Form>
      </Container>
      >
    </FlexContainer>
  </Layout>
);

PhoneLoginPresenter.propTypes = {
  countryCode: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired
};

export default PhoneLoginPresenter;
