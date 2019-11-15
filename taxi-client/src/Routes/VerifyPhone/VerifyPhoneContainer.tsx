import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { verifyPhone, verifyPhoneVariables } from "../../types/api";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { VERIFY_PHONE } from "./VerifyPhoneQueries";

interface IState {
  key: string;
  phoneNumber: string;
}

class VerifyMutation extends Mutation<verifyPhone, verifyPhoneVariables> {}

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
      key: "",
      phoneNumber: props.location.state.phone
    };
  }

  public render() {
    const { key, phoneNumber } = this.state;
    return (
      <VerifyMutation mutation={VERIFY_PHONE} variables={{ key, phoneNumber }}>
        {(mutation, { loading }) => (
          <VerifyPhonePresenter
            onSubmit={mutation}
            onChange={this.onInputChange}
            key={key}
            loading={loading}
          />
        )}
      </VerifyMutation>
    );
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
