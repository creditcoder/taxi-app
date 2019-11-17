import React from "react";
import styled from "../../typed-components";

const Container = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
`;

const TextBlock = styled.div`
  margin-left: 15px;
`;

const Name = styled.span``;

const Icon = styled.span`
  width: 36px;
  height: 36px;
  margin-left: 20px;
  border-radius: 50%;
  box-shadow: 0 2px 5px ${props => props.theme.orangeColor};
  cursor: pointer;
`;

const Address = styled.span`
  padding-left: 10px;
  color: ${props => props.theme.greyColor};
  font-size: 14px;
`;

interface IProps {
  isFav: boolean;
  name: string;
  address: string;
}

const Place: React.FC<IProps> = ({ isFav, name, address }) => (
  <Container>
    <Icon>
      {isFav ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="#f2a11f"
        >
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.326 18.266l-4.326-2.314-4.326 2.313.863-4.829-3.537-3.399 4.86-.671 2.14-4.415 2.14 4.415 4.86.671-3.537 3.4.863 4.829z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="#f2a11f"
        >
          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.834 9.686l-4.166.575 3.032 2.914-.74 4.139 3.708-1.982 3.708 1.983-.74-4.139 3.032-2.915-4.166-.575-1.834-3.784-1.834 3.784z" />
        </svg>
      )}
    </Icon>
    <TextBlock>
      <Name>{name}</Name>
      <Address>{address}</Address>
    </TextBlock>
  </Container>
);

export default Place;
