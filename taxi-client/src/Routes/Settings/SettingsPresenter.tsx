import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Layout from "../../Components/Container";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import styled from "../../typed-components";
import { getPlaces, userProfile } from "../../types/api";

const ExtendedHeader = styled(Header)`
  margin-bottom: 30px;
`;

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
  display: flex;
  justify-content: center;
`;

const ExtendedButton = styled(Button)`
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 2px 25px ${props => props.theme.blueColor};
  background-color: ${props => props.theme.blueColor};
  transition: 0.3s;
  &:hover {
    margin: 5px 0 15px 0;
  }
`;

const ExtendedButtonLogOut = styled(ExtendedButton)`
  box-shadow: 0 2px 25px ${props => props.theme.pinkColor};
  background-color: ${props => props.theme.pinkColor};
  margin: 10px 0 30px 0;
  &:hover {
    margin: 5px 0 35px 0;
  }
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
      <ExtendedHeader title={"Account Settings"} backTo={"/"} />
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
        places.map(place => (
          <Place
            key={place!.id}
            isFav={place!.isFav}
            name={place!.name}
            address={place!.address}
          />
        ))}
      <FlexLink to={"/places"}>
        <ExtendedButton value={"Go to Places"} onClick={null} />
      </FlexLink>
      <FlexLink>
        <ExtendedButtonLogOut value={"Log Out"} onClick={logUserOut} />
      </FlexLink>
    </Layout>
  </>
);

export default SettingsPresenter;
