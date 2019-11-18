import React from "react";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Layout from "../../Components/Container";
import Header from "../../Components/Header";

const AddPlacePresenter: React.FC = () => (
  <>
    <Helmet>
      <title>Add Place | Taxi</title>
    </Helmet>
    <Layout>
      <Header title={"Add Place"} backTo={"/"} />
      <Button onClick={null} value={"Add Place"} />
    </Layout>
  </>
);

export default AddPlacePresenter;
