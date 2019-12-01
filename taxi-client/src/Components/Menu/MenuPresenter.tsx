import React from "react";
import { MutationFn } from "react-apollo";
import { Link } from "react-router-dom";
import { rotate } from "../../animations";
import defaultProfilePhoto from "../../images/defaultProfilePhoto.png";
import styled from "../../typed-components";
import { userProfile } from "../../types/api";
import { BlueButton, YellowButton } from "../Button";

const Container = styled.div`
  height: 100%;
`;

const SLink = styled(Link)`
  color: ${props => props.theme.violetColor};
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-size: 22px;
  font-weight: 400;
`;

const Header = styled.div`
  background-color: ${props => props.theme.violetColor};
  height: 20%;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  overflow: hidden;
  background-color: grey;
`;

const Name = styled.h2`
  margin-bottom: 10px;
  font-size: 22px;
  line-height: 25px;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Rating = styled.h5`
  font-size: 18px;
  line-height: 20px;
  color: white;
`;

const Text = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 10px;
  align-items: center;
`;

const LoadingIcon = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

const CenteredYellowButton = styled(YellowButton)`
  margin-left: calc(50% - 75px);
`;

const CenteredBlueButton = styled(BlueButton)`
  margin-left: calc(50% - 75px);
`;


interface IProps {
  data?: userProfile;
  loading: boolean;
  toggleDriving: MutationFn;
}

const MenuPresenter: React.FC<IProps> = ({
  data: { GetMyProfile: { user = {} } = {} } = {},
  loading,
  toggleDriving
}) => (
  <Container>
    {loading || !user ? (
      <LoadingIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="#5b0c75"
        >
          <path d="M14 22c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm-2-22c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 10c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm-22 2c0 1.105.896 2 2 2s2-.895 2-2c0-1.104-.896-2-2-2s-2 .896-2 2zm19-9c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm0 14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm-14-14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm0 14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2z" />
        </svg>
      </LoadingIcon>
    ) : (
      <>
        <Header>
          <Grid>
            <Link to={"/edit-account"}>
              <Image src={user.profilePhoto || defaultProfilePhoto} />
            </Link>
            <Text>
              <Name>{user.fullName}</Name>
              <Rating>Rating: 4.5</Rating>
            </Text>
          </Grid>
        </Header>
        <SLink to={"/trips"}>My Trips</SLink>
        <SLink to={"/settings"}>Settings</SLink>
        {user.isDriving ? (
          <CenteredYellowButton onClick={toggleDriving}>Stop driving</CenteredYellowButton>
        ) : (
          <CenteredBlueButton onClick={toggleDriving}>Start driving</CenteredBlueButton>
        )}
      </>
    )}
  </Container>
);

export default MenuPresenter;
