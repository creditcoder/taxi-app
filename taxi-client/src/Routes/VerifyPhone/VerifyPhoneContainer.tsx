import React from "react";
import { Mutation, MutationFn } from "react-apollo";
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
  public phoneMutation: MutationFn;
  
  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      key: "",
      phoneNumber: props.localtion.state.phone
    };
  }

  public onSubmit: React.FormEventHandler<HTMLFontElement> = e => {
    e.preventDefault();
    const { countryCode, phoneNumber } = this.state;
    const phone = `${countryCode}${phoneNumber}`;
    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(phone);
    if (isValid) {
      this.phoneMutation();
    } else {
      toast.error("Phone is incorrect");
    }
  };

  public render() {
    const { key, phoneNumber } = this.state;
    return (
      <VerifyMutation mutation={VERIFY_PHONE} variables={{key, phoneNumber}}>
        {(mutation, {loading}) => {
          const preMutate
          <VerifyPhonePresenter onChange={this.onInputChange} key={key} />
        }}
      </VerifyMutation>
      )
    ;
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
