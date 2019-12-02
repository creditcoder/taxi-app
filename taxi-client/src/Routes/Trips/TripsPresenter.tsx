import React from "react";
import Helmet from "react-helmet";
import Layout from "../../Components/Container";
import Header from "../../Components/Header";
import { getMyRides } from "../../types/api";

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
  <Layout>
    <Helmet>
      <title>My Trips | Taxi</title>
    </Helmet>
    <Header backTo={"/"} title={"My Trips"} />
    {!loading &&
      ridesAsPassenger &&
      ridesAsPassenger.length > 0 &&
      ridesAsPassenger.map(ride => (
        <div key={ride!.id}>
          <div>{ride!.status}</div>
          <div>{ride!.pickUpAddress}</div>
          <div>{ride!.dropOffAddress}</div>
          <div>{ride!.price}</div>
          <div>{ride!.distance}</div>
          <div>{ride!.driver!.fullName}</div>
        </div>
      ))}
      {!loading &&
      ridesAsDriver &&
      ridesAsDriver.length > 0 &&
      ridesAsDriver.map(ride => (
        <div key={ride!.id}>
          <div>{ride!.status}</div>
          <div>{ride!.pickUpAddress}</div>
          <div>{ride!.dropOffAddress}</div>
          <div>{ride!.price}</div>
          <div>{ride!.distance}</div>
          <div>{ride!.passenger!.fullName}</div>
        </div>
      ))}
  </Layout>
);

export default TripsPresenter;
