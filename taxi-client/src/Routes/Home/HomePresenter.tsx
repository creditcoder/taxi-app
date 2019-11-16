import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import { Layout } from "../../Components/Container";
import Menu from "../../Components/Menu";

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const HomePresenter: React.FC<IProps> = ({ isMenuOpen, toggleMenu }) => (
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
          maxWidth: "600px",
          width: "60%", 
          zIndex: "10"
        } 
      }}
    >
      <button onClick={() => toggleMenu()}>Open sidebar</button>
    </Sidebar>
  </Layout>
);

export default HomePresenter;
