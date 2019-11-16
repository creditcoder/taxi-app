import React from "react";
import { RouteComponentProps } from "react-router";
import EditAccountPresenter from "./EditAccountPresenter";

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
}

class EditAccountContainer extends React.Component<
  RouteComponentProps,
  IState
> {
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    profilePhoto: ""
  };
  public render() {
    const { email, firstName, lastName, profilePhoto } = this.state;
    return (
      <EditAccountPresenter
        email={email}
        firstName={firstName}
        lastName={lastName}
        profilePhoto={profilePhoto}
        onInputChange={this.onInputChange}
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

export default EditAccountContainer;
