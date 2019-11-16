import React from "react";
import Helmet from "react-helmet";
import Layout from "../../Components/Container";

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditAccountPresenter: React.FC<IProps> = ({
  firstName,
  lastName,
  email,
  profilePhoto,
  onInputChange
}) => (
  <Layout>
    <Helmet>
      <title>Edit Account | Taxi</title>
    </Helmet>
  </Layout>
);

export default EditAccountPresenter;
