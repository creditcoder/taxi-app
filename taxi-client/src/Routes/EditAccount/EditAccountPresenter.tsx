import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import { BlueButton } from "../../Components/Button";
import Layout from "../../Components/Container";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import PhotoInput from "../../Components/PhotoInput";
import styled from "../../typed-components";

const ExtendedForm = styled(Form)`
  height: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  margin-bottom: 30px;
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
      <BlueButton onClick={null}>{loading ? "Loading" : "Update"}</BlueButton>
    </ExtendedForm>
  </Layout>
);

export default EditAccountPresenter;
