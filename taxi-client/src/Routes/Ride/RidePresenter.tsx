import React from "react";
import { MutationFn } from "react-apollo";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Layout from "../../Components/Container";
import styled from "../../typed-components";
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
`;

const ExtendedButton = styled(Button)`
  margin-bottom: 10px;
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
          {ride.driver &&
            ride.driver.id === user.id &&
            ride.status === "ACCEPTED" && (
              <ExtendedButton
                value={"Picked Up"}
                onClick={() =>
                  updateRideFn({
                    variables: {
                      rideId: ride.id,
                      status: "ONROUTE"
                    }
                  })
                }
              />
            )}
          {ride.driver &&
            ride.driver.id === user.id &&
            ride.status === "ONROUTE" && (
              <ExtendedButton
                value={"Finished"}
                onClick={() =>
                  updateRideFn({
                    variables: {
                      rideId: ride.id,
                      status: "FINISHED"
                    }
                  })
                }
              />
            )}
          {ride.status !== "REQUESTING" && (
            <Link to={`/chat/${ride.chatId}`}>
              <ExtendedButton value={"Chat"} onClick={null} />
            </Link>
          )}
        </Buttons>
      </>
    )}
  </Layout>
);

export default RidePresenter;
