import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
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

const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0;
`;

interface IProps {
  userData?: userProfile;
}

const SettingsPresenter: React.FC<IProps> = ({
  userData: { GetMyProfile: { user = null } = {} } = {}
}) => (
  <>
    <Helmet>
      <title>Settings | Taxi</title>
    </Helmet>
    <Layout>
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
      <SLink to={"/places"}>Go to Places</SLink>
      <FakeLink onClick={null}>Log Out</FakeLink>
    </Layout>
  </>
);

export default SettingsPresenter;
