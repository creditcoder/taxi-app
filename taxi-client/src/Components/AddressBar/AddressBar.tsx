import React from "react";
import styled from "../../typed-components";

const Container = styled.input`
  position: absolute;
  margin: auto;
  top: 10px;
  left: 0;
  right: 0;
  width: 80%;
  max-width: 700px;
  padding: 15px 10px;
  border-radius: 5px;
  border: 0;
  -webkit-appearance: none;
  box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);
  background-color: white;
  font-size: 16px;
  z-index: 2;
`;

interface IProps {
  value: string;
  onBlur: () => void;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressBar: React.FC<IProps> = ({ value, onBlur, name, onChange }) => (
  <Container
    value={value}
    onBlur={onBlur}
    onChange={onChange}
    placeholder={"Type address"}
    name={name}
  />
);

export default AddressBar;
