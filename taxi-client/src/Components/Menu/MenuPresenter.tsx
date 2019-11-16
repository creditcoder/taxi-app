import React from "react";
import { Link } from "react-router-dom";
import styled from "../../typed-components";

const Container = styled.div`
  height: 100%;
`;

const SLink = styled(Link)`
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-size: 22px;
  font-weight: 400;
`;

const Header = styled.div`
  background-color: ${props => props.theme.violetColor};
  height: 20%;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  overflow: hidden;
  background-color: grey;
`;

const MenuPresenter: React.FC = () => (
  <Container>
    <Header>
      <Link to={"/edit-account"}>
        <Image
          src={
            "https://scontent.fiev22-2.fna.fbcdn.net/v/t39.2081-6/c0.0.129.129a/p128x128/78024629_421554868471770_4379210489645760512_n.png?_nc_cat=101&_nc_oc=AQmk0a3oLcjRLRxaOI8i1Z5zx_hIrD94Sbo7SZte4YwfjqxWOM8PJJB2IMPf5claA2I&_nc_ht=scontent.fiev22-2.fna&oh=d8ecd571d1977081fa231f188bfda6a2&oe=5E84BDA4"
          }
        />
      </Link>
    </Header>
    <SLink to={"/trips"}>My Trips</SLink>
    <SLink to={"/settings"}>Settings</SLink>
  </Container>
);

export default MenuPresenter;
