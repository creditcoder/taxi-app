import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { BlueButton, VioletButton } from "../../Components/Button";
import Layout from "../../Components/Container";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled, { css } from "../../typed-components";

const ExtendedForm = styled(Form)`
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ExtendedLink = styled(Link)`
  display: block;
  text-align: center;
`;

const AddButton = styled(BlueButton)`
  display: block;
  margin: 0 auto 30px auto;
  &:disabled {
    &:hover {
      box-shadow: 0 2px 25px ${props => props.theme.blueColor};
      background: ${props =>
        css`linear-gradient(${props.theme.blueColor}, ${props.theme.darkBlueColor})`};
    }
  }
`;

interface IProps {
  address: string;
  name: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  onSubmit: MutationFn;
  pickedAddress: boolean;
}

const AddPlacePresenter: React.FC<IProps> = ({
  address,
  name,
  onInputChange,
  loading,
  onSubmit,
  pickedAddress
}) => (
  <>
    <Helmet>
      <title>Add Place | Taxi</title>
    </Helmet>
    <Layout>
      <Header title={"Add Place"} backTo={"/"} />
      <ExtendedForm submitFn={onSubmit}>
        <Input
          placeholder={"Name"}
          type={"text"}
          width={"200px"}
          value={name}
          name={"name"}
          onChange={onInputChange}
        />
        <Input
          placeholder={"Address"}
          type={"text"}
          width={"200px"}
          value={address}
          name={"address"}
          onChange={onInputChange}
        />
        <ExtendedLink to={"/find-address"}>
          <VioletButton onClick={null}>Pick from Map</VioletButton>
        </ExtendedLink>
        <AddButton disabled={!pickedAddress} onClick={null}>
          {loading ? "Adding" : "Add Place"}
        </AddButton>
      </ExtendedForm>
    </Layout>
  </>
);

export default AddPlacePresenter;
