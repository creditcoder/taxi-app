import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import { Layout } from "../../Components/Container";
import Menu from "../../Components/Menu";
import styled from "../../typed-components";

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 999;
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
      {!loading && <button onClick={toggleMenu}>Open sidebar</button>}
      <Map ref={mapRef} />
    </Sidebar>
  </Layout>
);

export default HomePresenter;
