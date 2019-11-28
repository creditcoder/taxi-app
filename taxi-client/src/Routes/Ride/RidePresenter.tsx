import React from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Layout from "../../Components/Container";
import styled from "../../typed-components";
import { getRide, userProfile } from "../../types/api";

const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

const Data = styled.span`
  color: ${props => props.theme.violetColor};
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  margin-right: 20px;
  border-radius: 50%;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  margin: 30px 0;
`;

const ExtendedButton = styled(Button)`
  margin-bottom: 30px;
`;

interface IProps {
  data?: getRide;
  userData?: userProfile;
  loading: boolean;
}

const RidePresenter: React.FC<IProps> = ({
  data: { GetRide: { ride = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {}
}) => (
  <Layout>
    {ride && user && (
      <>
        <Title>Passenger</Title>
        <Passenger>
          <Image src={ride.passenger.profilePhoto!} />
          <Data>{ride.passenger.fullName!}</Data>
        </Passenger>
        {ride.driver && (
          <>
            <Title>Driver</Title>
            <Passenger>
              <Image src={ride.driver.profilePhoto!} />
              <Data>{ride.driver.fullName!}</Data>
            </Passenger>
          </>
        )}
        <Title>From</Title>
        <Data>{ride.pickUpAddress}</Data>
        <Buttons>
          {ride.driver.id === user.id && ride.status === "ACCEPTED" && (
            <ExtendedButton
              value={"Picked Up"}
              onClick={() => {
                return;
              }}
            />
          )}
          {ride.driver.id === user.id && ride.status === "ONROUTE" && (
            <ExtendedButton
              value={"Finished"}
              onClick={() => {
                return;
              }}
            />
          )}
          {ride.driver.id === user.id ||
            (ride.passenger.id === user.id && ride.status === "ACCEPTED" && (
              <Link to={`/chat/${ride.chatId}`}>
                <ExtendedButton value={"Chat"} onClick={null} />
              </Link>
            ))}
        </Buttons>
      </>
    )}
  </Layout>
);

export default RidePresenter;
