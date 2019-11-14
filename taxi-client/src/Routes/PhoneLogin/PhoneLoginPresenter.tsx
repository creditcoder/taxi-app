import React from "react";
import Helmet from "react-helmet";
import { rotate } from "../../animations";
import BackArrow from "../../Components/BackArrow";
import Layout from "../../Components/Container";
import Input from "../../Components/Input";
import countries from "../../countries";
import styled, { css } from "../../typed-components";

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
  animation: ${props =>
    props.loading
      ? css`
          ${rotate} 2s linear infinite
        `
      : "none"};
  box-shadow: ${props =>
    props.loading
      ? "none"
      : // tslint:disable-next-line:no-shadowed-variable
        css`0 5px 10px ${props => props.theme.violetColor}`};
  background-color: white;
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
  transition: ${props => (props.loading ? "0" : "0.2s")};
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
  loading: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFontElement>) => void;
}

const PhoneLoginPresenter: React.FC<IProps> = ({
  countryCode,
  phoneNumber,
  onInputChange,
  onSubmit,
  loading
}) => (
  <Layout minHeight={"330px"} textAlign={"center"} padding={"50px 20px"}>
    <Helmet>
      <title>Phone Login | Taxi</title>
    </Helmet>
    <BackArrowLeftTop backTo={"/"} />
    <Title>Enter your mobile number</Title>
    <Subtitle>Select country:</Subtitle>
    <CountrySelect
      name="countryCode"
      value={countryCode}
      onChange={onInputChange}
    >
      {countries.map((country, index) => (
        <CountryOption key={index} value={country.dial_code}>
          {country.flag} {country.name} ({country.dial_code})
        </CountryOption>
      ))}
    </CountrySelect>
    <Form onSubmit={onSubmit}>
      <Subtitle>Number:</Subtitle>
      <Input
        onChange={onInputChange}
        name="phoneNumber"
        width="170px"
        placeholder={"50 123 45 67"}
        value={phoneNumber}
      />
      <Button onClick={onSubmit} loading={loading}>
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
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="#5b0c75"
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19l-1.782-1.75 5.25-5.25-5.25-5.25 1.782-1.75 6.968 7-6.968 7z" />
          </svg>
        )}
      </Button>
    </Form>
  </Layout>
);

export default PhoneLoginPresenter;
