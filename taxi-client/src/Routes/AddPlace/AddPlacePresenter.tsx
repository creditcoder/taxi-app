import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
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

const FindButton = styled(Button)`
  border-radius: 20px;
  box-shadow: 0 2px 25px ${props => props.theme.pinkColor};
  background: ${props =>
    css`linear-gradient(${props.theme.pinkColor}, #b918cc)`};
  &:hover {
    box-shadow: 0 2px 25px ${props => props.theme.orangeColor};
    background: ${props =>
      css`linear-gradient(${props.theme.yellowColor}, ${props.theme.orangeColor})`};
  }
`;

const AddButton = styled(Button)`
  display: block;
  margin: 0 auto 30px auto;
  border-radius: 20px;
  box-shadow: 0 2px 25px ${props => props.theme.blueColor};
  background: ${props =>
    css`linear-gradient(${props.theme.blueColor}, ${props.theme.darkBlueColor})`};
  &:hover {
    box-shadow: 0 2px 25px ${props => props.theme.orangeColor};
    background: ${props =>
      css`linear-gradient(${props.theme.yellowColor}, ${props.theme.orangeColor})`};
  }
`;

interface IProps {
  address: string;
  name: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  onSubmit: MutationFn;
}

const AddPlacePresenter: React.FC<IProps> = ({
  address,
  name,
  onInputChange,
  loading,
  onSubmit
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
          <FindButton onClick={null} value={"Pick from Map"} />
        </ExtendedLink>
        <AddButton onClick={null} value={loading ? "Adding" : "Add Place"} />
      </ExtendedForm>
    </Layout>
  </>
);

export default AddPlacePresenter;
