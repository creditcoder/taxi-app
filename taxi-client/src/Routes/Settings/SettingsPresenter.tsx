import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Layout from "../../Components/Container";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import styled from "../../typed-components";
import { userProfile } from "../../types/api";

const Image = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
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
`;

interface IProps {
  userData?: userProfile;
  logUserOut: MutationFn;
}

const SettingsPresenter: React.FC<IProps> = ({
  userData: { GetMyProfile: { user = null } = {} } = {},
  logUserOut
}) => (
  <>
    <Helmet>
      <title>Settings | Taxi</title>
    </Helmet>
    <Layout minHeight={"500px"}>
      <Header title={"Account Settings"} backTo={"/"} />
      <GridLink to={"/edit-account"}>
        {user && (
          <>
            <Image src={user.profilePhoto} />
            <Keys>
              <Key>{user.fullName}</Key>
              <Key>{user.email}</Key>
            </Keys>
          </>
        )}
      </GridLink>
      <Place isFav={false} name={"Name"} address={"hello ama address"} />
      <Place isFav={false} name={"Name"} address={"hello ama address"} />
      <Place isFav={true} name={"Name"} address={"hello ama address"} />
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
