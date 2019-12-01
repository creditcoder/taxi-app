import React from "react";
import { MutationFn } from "react-apollo";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Layout from "../../Components/Container";
import styled, { css } from "../../typed-components";
import { getRide, userProfile } from "../../types/api";

const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const Data = styled.span`
  color: ${props => props.theme.violetColor};
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  margin-right: 20px;
  border-radius: 50%;
  box-shadow: 0 2px 25px ${props => props.theme.greyColor};
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ExtendedButton = styled(Button)`
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
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

const ExtendedChatButton = styled(Button)`
  position: relative;
  margin-bottom: 15px;
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

const NewMessageCount = styled.span`
  position: absolute;
  top: -15px;
  right: -10px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: ${props => props.theme.orangeColor};
  border-radius: 50%;
  font-size: 16px;
  box-shadow: 0 2px 10px ${props => props.theme.orangeColor};
  z-index: 11;
`;

interface IProps {
  data?: getRide;
  userData?: userProfile;
  loading: boolean;
  updateRideFn: MutationFn;
}

const RidePresenter: React.FC<IProps> = ({
  data: { GetRide: { ride = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  updateRideFn
}) => (
  <Layout textAlign={"center"}>
    {ride && user && (
      <>
        <Title>Passenger</Title>
        <Passenger>
          <Image src={ride.passenger.profilePhoto!} alt="No photo" />
          <Data>{ride.passenger.fullName!}</Data>
        </Passenger>
        {ride.driver && (
          <>
            <Title>Driver</Title>
            <Passenger>
              <Image src={ride.driver.profilePhoto} alt="No photo" />
              <Data>{ride.driver.fullName!}</Data>
            </Passenger>
          </>
        )}
        <Title>From</Title>
        <Data>{ride.pickUpAddress}</Data>
        <Title>To</Title>
        <Data>{ride.dropOffAddress}</Data>
        <Title>Price</Title>
        <Data>{ride.price}</Data>
        <Title>Distance</Title>
        <Data>{ride.distance}</Data>
        <Title>Duration</Title>
        <Data>{ride.duration}</Data>
        <Title>Status</Title>
        <Data>{ride.status}</Data>
        <Buttons>
          {ride.status !== "REQUESTING" && (
            <Link to={`/chat/${ride.chatId}`}>
              <ExtendedChatButton onClick={null}>
                Chat
                <NewMessageCount>10</NewMessageCount>
              </ExtendedChatButton>
            </Link>
          )}
          {ride.driver &&
            ride.driver.id === user.id &&
            ride.status === "ACCEPTED" && (
              <ExtendedButton
                onClick={() =>
                  updateRideFn({
                    variables: {
                      rideId: ride.id,
                      status: "ONROUTE"
                    }
                  })
                }
              >
                Picked Up
              </ExtendedButton>
            )}
          {ride.driver &&
            ride.driver.id === user.id &&
            ride.status === "ONROUTE" && (
              <ExtendedButton
                onClick={() =>
                  updateRideFn({
                    variables: {
                      rideId: ride.id,
                      status: "FINISHED"
                    }
                  })
                }
              >
                Finished
              </ExtendedButton>
            )}
        </Buttons>
      </>
    )}
  </Layout>
);

export default RidePresenter;
