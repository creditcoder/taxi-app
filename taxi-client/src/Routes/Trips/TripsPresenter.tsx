import React from "react";
import Helmet from "react-helmet";
import Layout from "../../Components/Container";
import Header from "../../Components/Header";
import styled from "../../typed-components";
import { getMyRides } from "../../types/api";

const Ride = styled.div`
  padding: 5px;
  margin: 20px auto;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border: 1px solid #ededed;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

const RideDetail = styled.div`
  margin: 5px;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.03);
  text-align: center;
  color: ${props => props.theme.violetColor};
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;

const RideDetailDriver = styled(RideDetail)`
  color: white;
  background: ${props => props.theme.orangeColor};
`;

interface IProps {
  data?: getMyRides;
  loading: boolean;
}

const TripsPresenter: React.FC<IProps> = ({
  data: {
    GetMyRides: { ridesAsDriver = null, ridesAsPassenger = null } = {}
  } = {},
  loading
}) => (
  <Layout maxHeight="800px">
    <Helmet>
      <title>My Trips | Taxi</title>
    </Helmet>
    <Header backTo={"/"} title={"My Trips"} />
    {!loading &&
      ridesAsPassenger &&
      ridesAsPassenger.length > 0 &&
      ridesAsPassenger.reverse().map(ride => {
        const date = new Date(Number(ride!.updatedAt!));
        const formattedDate = `${date.getDate()}-${date.getMonth() +
          1}-${date.getFullYear()}`;
        return (
          <Ride key={ride!.id}>
            <RideDetail>{formattedDate}</RideDetail>
            <RideDetail>{ride!.status}</RideDetail>
            <RideDetail>${ride!.price}</RideDetail>
            <RideDetail>{ride!.distance}</RideDetail>
            <RideDetail>
              <Image src={ride!.driver!.profilePhoto} />
              {ride!.driver!.fullName}
            </RideDetail>
            <RideDetail>
              {ride!.pickUpAddress}=>{ride!.dropOffAddress}
            </RideDetail>
          </Ride>
        );
      })}
    {!loading &&
      ridesAsDriver &&
      ridesAsDriver.length > 0 &&
      ridesAsDriver.reverse().map(ride => {
        const date = new Date(Number(ride!.updatedAt!));
        const formattedDate = `${date.getDate()}-${date.getMonth() +
          1}-${date.getFullYear()}`;
        return (
          <Ride key={ride!.id}>
            <RideDetailDriver>{formattedDate}</RideDetailDriver>
            <RideDetailDriver>{ride!.status}</RideDetailDriver>
            <RideDetailDriver>${ride!.price}</RideDetailDriver>
            <RideDetailDriver>{ride!.distance}</RideDetailDriver>
            <RideDetailDriver>
              <Image src={ride!.passenger!.profilePhoto} />
              {ride!.passenger!.fullName}
            </RideDetailDriver>
            <RideDetailDriver>
              {ride!.pickUpAddress}=>{ride!.dropOffAddress}
            </RideDetailDriver>
          </Ride>
        );
      })}
  </Layout>
);

export default TripsPresenter;
