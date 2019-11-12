import React from "react";
import { Link } from "react-router-dom";
import styled from "../../typed-components";

const Container = styled.div``;

interface IProps {
  backTo: string;
}

const BackArrow: React.FC<IProps> = ({ backTo }) => (
  <Container>
    <Link to={backTo}>here will be svg</Link>
  </Container>
);

export default BackArrow;
