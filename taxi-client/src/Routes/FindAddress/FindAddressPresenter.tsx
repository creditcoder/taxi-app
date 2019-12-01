import React from "react";
import Helmet from "react-helmet";
import AddressBar from "../../Components/AddressBar";
import { VioletButton } from "../../Components/Button";
import styled from "../../typed-components";

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const Centered = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  z-index: 2;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Icon = styled.span``;

const ExtendedVioletButton = styled(VioletButton)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  max-width: 400px;
  width: 200px;
`;

interface IProps {
  mapRef: any;
  address: string;
  onInputBlur: () => void;
  onPickPlace: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class FindAddressPresenter extends React.Component<IProps> {
  public render() {
    const {
      mapRef,
      address,
      onInputBlur,
      onInputChange,
      onPickPlace
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>Find Address | Taxi</title>
        </Helmet>
        <AddressBar
          onBlur={onInputBlur}
          onChange={onInputChange}
          name={"address"}
          value={address}
        />
        <ExtendedVioletButton onClick={onPickPlace}>Pick this place</ExtendedVioletButton>
        <Centered>
          <Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
            </svg>
          </Icon>
        </Centered>
        <Map ref={mapRef} />
      </div>
    );
  }
}

export default FindAddressPresenter;
