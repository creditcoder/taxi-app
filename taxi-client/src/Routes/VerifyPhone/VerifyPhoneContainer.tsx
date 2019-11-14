import React from "react";
import { RouteComponentProps } from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";

interface IState {
  key: string;
}

class VerifyPhoneContainer extends React.Component<
  RouteComponentProps,
  IState
> {
  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      key: ""
    };
  }

  public render() {
    const { key } = this.state;
    return <VerifyPhonePresenter onChange={this.onInputChange} key={key} />;
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const {
      target: { name, value }
    } = e;
    this.setState(({
      [name]: value
    } as unknown) as IState);
  };
}

export default VerifyPhoneContainer;
