import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { BlueButton, VioletButton } from "../../Components/Button";
import Layout from "../../Components/Container";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import styled from "../../typed-components";
import { getPlaces, userProfile } from "../../types/api";

const Image = styled.img`
  margin: 0 20px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  box-shadow: 0 2px 25px ${props => props.theme.greyColor};
`;

const GridLink = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
`;

const Keys = styled.div``;

const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const FlexLink = styled(Link)`
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
`;

interface IProps {
  userData?: userProfile;
  logUserOut: MutationFn;
  userDataLoading: boolean;
  placesData?: getPlaces;
  placesLoading: boolean;
}

const SettingsPresenter: React.FC<IProps> = ({
  userData: { GetMyProfile: { user = null } = {} } = {},
  logUserOut,
  userDataLoading,
  placesData: { GetMyPlaces: { places = null } = {} } = {},
  placesLoading
}) => (
  <>
    <Helmet>
      <title>Settings | Taxi</title>
    </Helmet>
    <Layout>
      <Header title={"Account Settings"} backTo={"/"} />
      <GridLink to={"/edit-account"}>
        {!userDataLoading && user && (
          <>
            <Image src={user.profilePhoto} />
            <Keys>
              <Key>{user.fullName}</Key>
              <Key>{user.email}</Key>
            </Keys>
          </>
        )}
      </GridLink>
      {!placesLoading &&
        places &&
        places
          .sort((a, b) => a!.id - b!.id)
          .map(place => (
            <Place
              key={place!.id}
              id={place!.id}
              fav={place!.isFav}
              name={place!.name}
              address={place!.address}
            />
          ))}
      <FlexLink to={"/places"}>
        <BlueButton onClick={null}>Go to Places</BlueButton>
      </FlexLink>
      <FlexLink>
        <VioletButton onClick={logUserOut}>Log Out</VioletButton>
      </FlexLink>
    </Layout>
  </>
);

export default SettingsPresenter;
