import React from "react";
import styled from "../../typed-components";
import BackArrow from "../BackArrow";

const ExtendedBackArrow = styled(BackArrow)`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const Container = styled.header`
  background-color: ${props => props.theme.violetColor};
  color: white;
  display: flex;
  height: 50px;
  font-size: 20px;
  font-weight: 300;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  & svg {
    fill: white;
  }
  margin-bottom: 50px;
  padding: 0 10px;
`;

const Title = styled.h2`
  margin-left: 10px;
`;

interface IProps {
  title: string;
  backTo?: string;
}

const Header: React.FC<IProps> = ({ title, backTo }) => (
  <Container>
    {backTo && <ExtendedBackArrow backTo={backTo} />}
    <Title>{title}</Title>
  </Container>
);

export default Header;
