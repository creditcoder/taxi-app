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
  flex-grow: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.03);
  text-align: center;
  color: ${props => props.theme.violetColor};
`;

const Label = styled.span`
  margin: 0 5px;
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  border-radius: 50%;
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
        let minutes = date.getMinutes().toString();
        minutes = minutes.length < 2 ? "0" + minutes : minutes;
        const formattedDate = `${date.getDate()}-${date.getMonth() +
          1}-${date.getFullYear()} ${date.getHours()}:${minutes}`;
        return (
          <Ride key={ride!.id}>
            <RideDetail>
              <Label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#2459c9"
                >
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z" />
                </svg>
              </Label>
              {formattedDate}
            </RideDetail>
            <RideDetail>{ride!.status}</RideDetail>
            <RideDetail>
              <Label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#f59a07"
                >
                  <path d="M18.5 21.5c2.081 0 4.239-.484 5.5-1.402v.652c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.652c1.26.918 3.42 1.402 5.5 1.402zm0-5c2.081 0 4.239-.484 5.5-1.402v.652c0 1.242-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.652c1.26.918 3.42 1.402 5.5 1.402zm0 2.5c2.081 0 4.239-.484 5.5-1.401v.651c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.651c1.26.917 3.42 1.401 5.5 1.401zm0-5c2.081 0 4.239-.484 5.5-1.401v.651c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.651c1.26.917 3.42 1.401 5.5 1.401zm0-13c-2.939 0-5.5 1.007-5.5 2.25s2.561 2.25 5.5 2.25c2.94 0 5.5-1.007 5.5-2.25s-2.56-2.25-5.5-2.25zm.174 3.28v.22h-.354v-.208c-.36-.003-.743-.056-1.058-.152l.162-.343c.269.063.606.126.911.126l.229-.014c.405-.053.486-.301.037-.419-.328-.09-1.335-.166-1.335-.675 0-.284.367-.537 1.054-.593v-.222h.354v.211c.258.005.544.03.863.09l-.128.342c-.243-.051-.514-.099-.779-.099l-.079.001c-.531.02-.573.287-.207.399.602.169 1.394.292 1.394.74-.001.358-.477.549-1.064.596zm-.174 7.22c2.081 0 4.239-.484 5.5-1.402v.652c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.652c1.26.918 3.42 1.402 5.5 1.402zm0-5c2.081 0 4.239-.484 5.5-1.402v.652c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.652c1.26.918 3.42 1.402 5.5 1.402zm0 2.5c2.081 0 4.239-.484 5.5-1.401v.651c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.651c1.26.917 3.42 1.401 5.5 1.401zm-13 2c-2.939 0-5.5 1.007-5.5 2.25s2.561 2.25 5.5 2.25c2.94 0 5.5-1.007 5.5-2.25s-2.56-2.25-5.5-2.25zm.174 3.28v.22h-.353v-.208c-.361-.003-.744-.056-1.058-.152l.162-.343c.269.063.607.126.911.126l.229-.014c.405-.053.487-.301.038-.419-.329-.09-1.335-.166-1.335-.675 0-.284.368-.537 1.054-.593v-.222h.353v.211c.258.005.544.03.863.09l-.128.342c-.243-.051-.513-.099-.779-.099l-.08.001c-.53.02-.572.287-.206.399.602.169 1.393.292 1.393.74-.001.358-.477.549-1.064.596zm-.174 7.22c2.081 0 4.239-.484 5.5-1.402v.652c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.652c1.26.918 3.42 1.402 5.5 1.402zm0-5c2.081 0 4.239-.484 5.5-1.402v.652c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.652c1.26.918 3.42 1.402 5.5 1.402zm0 2.5c2.081 0 4.239-.484 5.5-1.401v.651c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.651c1.26.917 3.42 1.401 5.5 1.401z" />
                </svg>
              </Label>
              ${ride!.price}
            </RideDetail>
            <RideDetail>{ride!.distance}</RideDetail>
            <RideDetail>
              <Image src={ride!.driver!.profilePhoto} />
              {ride!.driver!.fullName} | Driver
            </RideDetail>
            <RideDetail>
              {ride!.pickUpAddress}
              <Label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#5b0c75"
                >
                  <path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z" />
                </svg>
              </Label>
              {ride!.dropOffAddress}
            </RideDetail>
          </Ride>
        );
      })}
    {!loading &&
      ridesAsDriver &&
      ridesAsDriver.length > 0 &&
      ridesAsDriver.reverse().map(ride => {
        const date = new Date(Number(ride!.updatedAt!));
        let minutes = date.getMinutes().toString();
        minutes = minutes.length < 2 ? "0" + minutes : minutes;
        const formattedDate = `${date.getDate()}-${date.getMonth() +
          1}-${date.getFullYear()} ${date.getHours()}:${minutes}`;
        return (
          <Ride key={ride!.id}>
            <RideDetail>
              <Label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#2459c9"
                >
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z" />
                </svg>
              </Label>
              {formattedDate}
            </RideDetail>
            <RideDetail>{ride!.status}</RideDetail>
            <RideDetail>
              <Label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#f59a07"
                >
                  <path d="M18.5 21.5c2.081 0 4.239-.484 5.5-1.402v.652c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.652c1.26.918 3.42 1.402 5.5 1.402zm0-5c2.081 0 4.239-.484 5.5-1.402v.652c0 1.242-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.652c1.26.918 3.42 1.402 5.5 1.402zm0 2.5c2.081 0 4.239-.484 5.5-1.401v.651c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.651c1.26.917 3.42 1.401 5.5 1.401zm0-5c2.081 0 4.239-.484 5.5-1.401v.651c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.651c1.26.917 3.42 1.401 5.5 1.401zm0-13c-2.939 0-5.5 1.007-5.5 2.25s2.561 2.25 5.5 2.25c2.94 0 5.5-1.007 5.5-2.25s-2.56-2.25-5.5-2.25zm.174 3.28v.22h-.354v-.208c-.36-.003-.743-.056-1.058-.152l.162-.343c.269.063.606.126.911.126l.229-.014c.405-.053.486-.301.037-.419-.328-.09-1.335-.166-1.335-.675 0-.284.367-.537 1.054-.593v-.222h.354v.211c.258.005.544.03.863.09l-.128.342c-.243-.051-.514-.099-.779-.099l-.079.001c-.531.02-.573.287-.207.399.602.169 1.394.292 1.394.74-.001.358-.477.549-1.064.596zm-.174 7.22c2.081 0 4.239-.484 5.5-1.402v.652c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.652c1.26.918 3.42 1.402 5.5 1.402zm0-5c2.081 0 4.239-.484 5.5-1.402v.652c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.652c1.26.918 3.42 1.402 5.5 1.402zm0 2.5c2.081 0 4.239-.484 5.5-1.401v.651c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.651c1.26.917 3.42 1.401 5.5 1.401zm-13 2c-2.939 0-5.5 1.007-5.5 2.25s2.561 2.25 5.5 2.25c2.94 0 5.5-1.007 5.5-2.25s-2.56-2.25-5.5-2.25zm.174 3.28v.22h-.353v-.208c-.361-.003-.744-.056-1.058-.152l.162-.343c.269.063.607.126.911.126l.229-.014c.405-.053.487-.301.038-.419-.329-.09-1.335-.166-1.335-.675 0-.284.368-.537 1.054-.593v-.222h.353v.211c.258.005.544.03.863.09l-.128.342c-.243-.051-.513-.099-.779-.099l-.08.001c-.53.02-.572.287-.206.399.602.169 1.393.292 1.393.74-.001.358-.477.549-1.064.596zm-.174 7.22c2.081 0 4.239-.484 5.5-1.402v.652c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.652c1.26.918 3.42 1.402 5.5 1.402zm0-5c2.081 0 4.239-.484 5.5-1.402v.652c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.652c1.26.918 3.42 1.402 5.5 1.402zm0 2.5c2.081 0 4.239-.484 5.5-1.401v.651c0 1.243-2.56 2.25-5.5 2.25-2.939 0-5.5-1.007-5.5-2.25v-.651c1.26.917 3.42 1.401 5.5 1.401z" />
                </svg>
              </Label>
              ${ride!.price}
            </RideDetail>
            <RideDetail>{ride!.distance}</RideDetail>
            <RideDetail>
              <Image src={ride!.passenger!.profilePhoto} />
              {ride!.passenger!.fullName} | Passenger
            </RideDetail>
            <RideDetail>
              {ride!.pickUpAddress}
              <Label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#5b0c75"
                >
                  <path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z" />
                </svg>
              </Label>
              {ride!.dropOffAddress}
            </RideDetail>
          </Ride>
        );
      })}
  </Layout>
);

export default TripsPresenter;
