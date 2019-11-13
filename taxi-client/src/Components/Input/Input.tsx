import React from "react";
import styled from "../../typed-components";

const Container = styled.input`
  
  font-family: 'Jura', sans-serif;
  border: none;
  border-bottom: 2px solid ${props => props.theme.greyColor};
  font-size: 18px;
  width: ${props => props.width};
  padding-bottom: 10px;
  font-weight: 500;
  transition: border-bottom 0.1s linear;
  text-align: center;
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
  }
  &:focus {
    border-bottom-color: ${props => props.theme.pinkColor};
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
    font-weight: 300;
  }
`;

const Input = ({ placeholder, type, width }) => <Container width={width} type={type} placeholder={placeholder} />;

export default Input;
