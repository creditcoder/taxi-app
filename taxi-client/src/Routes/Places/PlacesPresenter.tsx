import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Layout from "../../Components/Container";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import styled, { css } from "../../typed-components";
import { getPlaces } from "../../types/api";

const ExtendedLink = styled(Link)`
  display: block;
  text-align: center;
  margin-bottom: 30px;
`;

const ExtendedButton = styled(Button)`
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
  data?: getPlaces;
  loading: boolean;
}

const PlacesPresenter: React.FC<IProps> = ({
  data: { GetMyPlaces: { places = null } = {} } = {},
  loading
}) => (
  <>
    <Helmet>
      <title>Places | Taxi</title>
    </Helmet>
    <Layout>
      <Header title={"Places"} backTo={"/"} />
      <ExtendedLink to={"/add-place"}>
        <ExtendedButton value={"+ Add New"} onClick={null} />
      </ExtendedLink>
      {!loading &&
        places &&
        places.map(place => {
          console.log(place);
          return (
            <Place
              key={place!.id}
              id={place!.id}
              fav={place!.isFav}
              name={place!.name}
              address={place!.address}
            />
          );
        })}
    </Layout>
  </>
);

export default PlacesPresenter;
