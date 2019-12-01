import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { BlueButton } from "../../Components/Button";
import Layout from "../../Components/Container";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import styled from "../../typed-components";
import { getPlaces } from "../../types/api";

const ExtendedLink = styled(Link)`
  display: block;
  text-align: center;
  margin-bottom: 30px;
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
        <BlueButton onClick={null}>+ Add New</BlueButton>
      </ExtendedLink>
      {!loading &&
        places &&
        places
          .sort((a, b) => a!.id - b!.id)
          .map(place => {
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
