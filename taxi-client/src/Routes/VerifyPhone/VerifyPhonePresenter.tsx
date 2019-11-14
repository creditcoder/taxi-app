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
  transition: 0.2s;
  &:hover {
    margin-top: 25px;
  }
`;

interface IProps {
  key: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VerifyPhonePresenter: React.FC<IProps> = ({ key, onChange }) => (
  <Container minHeight={"250px"} textAlign={"center"}>
    <Helmet>
      <title>Verify Phone | Taxi</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <Form>
      <ExtendedInput
        value={key}
        placeholder={"Enter Verification Code"}
        name={key}
        onChange={onChange}
      />
      <ExtendedButton value={"Submit"} onClick={null} />
    </Form>
  </Container>
);

export default VerifyPhonePresenter;
