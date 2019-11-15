import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Container from "../../Components/Container";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "../../typed-components";

const ExtendedForm = styled(Form)`
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
  verificationKey: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: MutationFn,
  loading: boolean
}

const VerifyPhonePresenter: React.FC<IProps> = ({ verificationKey, onChange, onSubmit, loading }) => (
  <Container minHeight={"250px"} textAlign={"center"}>
    <Helmet>
      <title>Verify Phone | Taxi</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput
        value={verificationKey}
        placeholder={"Enter Verification Code"}
        name={"verificationKey"}
        onChange={onChange}
      />
      <ExtendedButton disabled={loading} value={loading? "Verifying" : "Submit"} onClick={null} />
    </ExtendedForm>
  </Container>
);

export default VerifyPhonePresenter;
