import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import AddressBar from "../../Components/AddressBar";
import Button from "../../Components/Button";
import { Layout } from "../../Components/Container";
import Menu from "../../Components/Menu";
import styled from "../../typed-components";
import { userProfile } from "../../types/api";

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  left: 5px;
  text-align: center;
  font-weight: 900;
  border: 0;
  cursor: pointer;
  font-size: 30px;
  color: ${props => props.theme.violetColor};
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  max-width: 400px;
  width: 80%;
`;

const RequestButton = styled(ExtendedButton)`
  bottom: 120px;
`;

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  loading: boolean;
  mapRef: any;
  toAddress: string;
  onAddressSubmit: () => void;
  price?: number;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data?: userProfile;
}

const HomePresenter: React.FC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  loading,
  mapRef,
  toAddress,
  onInputChange,
  onAddressSubmit,
  price,
  data: { GetMyProfile: { user = null } = {} } = {}
}) => (
  <Layout>
    <Helmet>
      <title>Home | Taxi</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu />}
      open={isMenuOpen}
      onSetOpen={toggleMenu}
      styles={{
        sidebar: {
          backgroundColor: "white",
          maxWidth: "450px",
          width: "60%",
          zIndex: "10"
        }
      }}
    >
      {!loading && <MenuButton onClick={toggleMenu}>|||</MenuButton>}
      {user && !user.isDriving && (
        <>
          <AddressBar
            name={"toAddress"}
            onChange={onInputChange}
            value={toAddress}
            onBlur={() => ""}
          />
          <ExtendedButton
            onClick={onAddressSubmit}
            disabled={toAddress === ""}
            value={price ? "Change address" : "Pick Address"}
          />
        </>
      )}
      {price && (
        <RequestButton
          onClick={onAddressSubmit}
          disabled={toAddress === ""}
          value={`Request ride ($${price})`}
        />
      )}
      <Map ref={mapRef} />
    </Sidebar>
  </Layout>
);

export default HomePresenter;
