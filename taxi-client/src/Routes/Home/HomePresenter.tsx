import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import { Layout } from "../../Components/Container";
import Menu from "../../Components/Menu";
import styled from "../../typed-components";

const Button = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  left: 15px;
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
}

const HomePresenter: React.FC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  loading,
  mapRef
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
      {!loading && <Button onClick={toggleMenu}>|||</Button>}
      <Map ref={mapRef} />
    </Sidebar>
  </Layout>
);

export default HomePresenter;
