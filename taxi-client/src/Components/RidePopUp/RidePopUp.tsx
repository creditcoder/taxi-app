import React from "react";
import styled from "../../typed-components";

const Container = styled.div`
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 80%;
  max-width: 600px;
  height: 60%;
  z-index: 9;
  padding: 20px;
  background-color: white;
`;

const Data = styled.span`
  color: ${props => props.theme.violetColor};
`;

interface IProps {
  pickUpAddress: string;
}

const RidePopUp: React.FC<IProps> = ({ pickUpAddress }) => (
  <Container>
    <Data>{pickUpAddress}</Data>
  </Container>
);

export default RidePopUp;
