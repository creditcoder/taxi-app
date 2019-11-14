import React from "react";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Container from "../../Components/Container";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "../../typed-components";

const Form = styled.form`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)``;

const ExtendedButton = styled(Button)`
  margin-top: 30px;
  border-radius: 10px;
  transition: .2s;
  &:hover{
    margin-top: 25px;
  }
`;

const VerifyPhonePresenter = () => (
  <Container minHeight={"250px"} textAlign={"center"}>
    <Helmet>
      <title>Verify Phone | Taxi</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <Form>
      <ExtendedInput value={""} placeholder={"Enter Verification Code"} />
      <ExtendedButton value={"Submit"} onClick={null} />
    </Form>
  </Container>
);

export default VerifyPhonePresenter;
