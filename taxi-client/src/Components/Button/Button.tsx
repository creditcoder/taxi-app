import React from "react";
import styled from "../../typed-components";

const FullWidth = styled.div``;

const Container = styled.input`
  font-family: 'Jura', sans-serif;
  min-width: 150px;
  background-color: ${props => props.theme.violetColor};
  color: white;
  text-transform: uppercase;
  padding: 15px 0;
  font-size: 16px;
  border: 0;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  &:active,
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.8;
  }
`;

interface IProps {
  value: string;
  onClick: any;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<IProps> = ({
  value,
  onClick,
  disabled = false,
  className
}) => (
  <FullWidth>
    <Container
    type={"submit"}
    className={className}
    value={value}
    disabled={false}
    onClick={onClick}
  />
  </FullWidth>
  
);

export default Button;
