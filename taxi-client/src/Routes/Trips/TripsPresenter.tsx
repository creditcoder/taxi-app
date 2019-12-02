import React from "react";
import Helmet from "react-helmet";
import Layout from "../../Components/Container";
import Header from "../../Components/Header";

const TripsPresenter: React.FC = () => (
  <Layout>
    <Helmet>
      <title>My Trips | Taxi</title>
    </Helmet>
    <Header backTo={"/"} title={"My Trips"} />
  </Layout>
);

export default TripsPresenter;
