import React from "react";
import Helmet from "react-helmet";
import Layout from "../../Components/Container";
import Header from "../../Components/Header";

const SettingsPresenter: React.FC = () => (
  <>
    <Helmet>
      <title>Settings | Taxi</title>
    </Helmet>
    <Layout>
      <Header title={"Account Settings"} backTo={"/"} />
    </Layout>
  </>
);

export default SettingsPresenter;
