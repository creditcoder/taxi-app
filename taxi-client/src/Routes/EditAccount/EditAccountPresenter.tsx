import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Layout from "../../Components/Container";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import PhotoInput from "../../Components/PhotoInput";
import styled from "../../typed-components";

const ExtendedForm = styled(Form)`
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  margin-bottom: 30px;
`;

const ExtendedButton = styled(Button)`
  border-radius: 10px;
  background-color: ${props => props.theme.blueColor};
  box-shadow: 0 2px 25px ${props => props.theme.blueColor};
  transition: 0.3s;
  &:hover {
    background-color: ${props => props.theme.violetColor};
    box-shadow: 0 2px 25px ${props => props.theme.violetColor};
  }
`;

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  onSubmit: MutationFn;
  uploading: boolean;
}

const EditAccountPresenter: React.FC<IProps> = ({
  firstName,
  lastName,
  email,
  profilePhoto,
  onInputChange,
  loading,
  onSubmit,
  uploading
}) => (
  <Layout>
    <Helmet>
      <title>Edit Account | Taxi</title>
    </Helmet>
    <Header title={"Edit Account"} backTo={"/"} />
    <ExtendedForm submitFn={onSubmit}>
      <PhotoInput
        uploading={uploading}
        fileUrl={profilePhoto}
        onChange={onInputChange}
      />
      <Input
        width={"250px"}
        onChange={onInputChange}
        type={"text"}
        value={firstName}
        placeholder={"First name"}
        name="firstName"
      />
      <Input
        width={"250px"}
        onChange={onInputChange}
        type={"text"}
        value={lastName}
        placeholder={"Last name"}
        name="lastName"
      />
      <Input
        width={"250px"}
        onChange={onInputChange}
        type={"email"}
        value={email}
        placeholder={"Email"}
        name="email"
      />
      <ExtendedButton onClick={null} value={loading ? "Loading" : "Update"} />
    </ExtendedForm>
  </Layout>
);

export default EditAccountPresenter;
