import styled, { css } from "../../typed-components";
import Button from "./Button";

const VioletButton = styled(Button)`
  box-shadow: 0 2px 25px ${props => props.theme.pinkColor};
  background: ${props =>
    css`linear-gradient(${props.theme.pinkColor}, #b918cc)`};
  &:hover {
    box-shadow: 0 2px 25px ${props => props.theme.orangeColor};
    background: ${props =>
      css`linear-gradient(${props.theme.yellowColor}, ${props.theme.orangeColor})`};
  }
`;

const BlueButton = styled(Button)`
  box-shadow: 0 2px 25px ${props => props.theme.blueColor};
  background: ${props =>
    css`linear-gradient(${props.theme.blueColor}, ${props.theme.darkBlueColor})`};
  &:hover {
    box-shadow: 0 2px 25px ${props => props.theme.orangeColor};
    background: ${props =>
      css`linear-gradient(${props.theme.yellowColor}, ${props.theme.orangeColor})`};
  }
`;

const YellowButton = styled(Button)`
  box-shadow: 0 2px 25px ${props => props.theme.orangeColor};
  background: ${props =>
    css`linear-gradient(${props.theme.yellowColor}, ${props.theme.orangeColor})`};
  &:hover {
    box-shadow: 0 2px 25px ${props => props.theme.pinkColor};
    background: ${props =>
      css`linear-gradient(${props.theme.pinkColor}, #b918cc)`};
  }
`;

export { BlueButton, VioletButton, YellowButton };
