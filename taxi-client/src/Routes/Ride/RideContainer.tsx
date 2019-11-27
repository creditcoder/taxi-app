import React from "react";
import { RouteComponentProps } from "react-router";
import RidePresenter from "./RidePresenter";

interface IProps extends RouteComponentProps<any> {}

class RideContainer extends React.Component<IProps> {
  public render() {
    return <RidePresenter />;
  }
}

export default RideContainer;
