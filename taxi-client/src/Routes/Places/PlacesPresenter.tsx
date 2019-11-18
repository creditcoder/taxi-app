import React from "react";
import Helmet from "react-helmet";
import Layout from "../../Components/Container";
import Header from "../../Components/Header";

const PlacesPresenter: React.FC = () => (
  <>
    <Helmet>
      <title>Places | Taxi</title>
    </Helmet>
    <Layout>
      <Header title={"Places"} backTo={"/"} />>
    </Layout>
  </>
);

export default PlacesPresenter;
