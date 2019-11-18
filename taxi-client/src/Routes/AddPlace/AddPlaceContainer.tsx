import React from "react";
import { RouteComponentProps } from "react-router";
import AddPlacePresenter from "./AddPlacePresenter";

interface IState {
  address: string;
  name: string;
}

class AddPlaceContainer extends React.Component<RouteComponentProps, IState> {
  public state = {
    address: "",
    name: ""
  };

  public render() {
    const { address, name } = this.state;
    return (
      <AddPlacePresenter
        onInputChange={this.onInputChange}
        address={address}
        name={name}
      />
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState(({
      [name]: value
    } as unknown) as IState);
  };
}

export default AddPlaceContainer;
