import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import { Layout } from "../../Components/Container";
import Menu from "../../Components/Menu";

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  loading: boolean;
}

const HomePresenter: React.FC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  loading
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
      {!loading && <button onClick={() => toggleMenu()}>Open sidebar</button>}
    </Sidebar>
  </Layout>
);

export default HomePresenter;
