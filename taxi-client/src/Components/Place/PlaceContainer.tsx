import React from "react";
import PlacePresenter from "./PlacePresenter";

interface IProps {
  isFav: boolean;
  name: string;
  address: string;
  id: number;
}

class PlaceContainer extends React.Component<IProps> {
  public render() {
    const { isFav, name, address } = this.props;
    return <PlacePresenter isFav={isFav} name={name} address={address} />;
  }
}

export default PlaceContainer;
