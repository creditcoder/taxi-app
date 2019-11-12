import React from "react";
import styled from "../../typed-components";

const Container = styled.input`
  border: none;
  border-bottom: 2px solid ${props => props.theme.greyColor};
  font-size: 20px;
  width: 100%;
  padding-bottom: 10px;
  font-weight: 500;
  transition: border-bottom 0.1s linear;
`;

const Input = ({ placeholder }) => <Container placeholder={placeholder} />;

export default Input;
