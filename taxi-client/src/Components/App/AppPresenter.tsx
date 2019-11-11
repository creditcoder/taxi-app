import React from "react";

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.FC<IProps> = ({ isLoggedIn }) => (
  <span>{isLoggedIn ? "you are logged in" : "you are logged out"}</span>
);

export default AppPresenter;
