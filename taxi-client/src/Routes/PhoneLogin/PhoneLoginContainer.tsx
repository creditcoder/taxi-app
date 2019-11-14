import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { toast } from "react-toastify";
import {
  startPhoneVerification,
  startPhoneVerificationVariables
} from "../../types/api";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { PHONE_SIGN_IN } from "./PhoneQueries.queries";
// tslint:disable-next-line:no-empty-interface
interface IProps {}
interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneSignInMutation extends Mutation<
  startPhoneVerification,
  startPhoneVerificationVariables
> {}
class PhoneLoginContainer extends React.Component<IProps, IState> {
  public phoneMutation: MutationFn;

  public state = {
    countryCode: "+380",
    phoneNumber: ""
  };

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = e => {
    const {
      target: { name, value }
    } = e;
    this.setState(({
      [name]: value
    } as unknown) as IState);
  };

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
    const { countryCode, phoneNumber } = this.state;
    return (
      <PhoneSignInMutation
        mutation={PHONE_SIGN_IN}
        variables={{ phoneNumber: `${countryCode}${phoneNumber}` }}
        onCompleted={data => {
          const { StartPhoneVerification } = data;
          if (StartPhoneVerification.ok) {
            return;
          } else {
            toast.error(StartPhoneVerification.error);
          }
        }}
      >
        {(mutation, { loading }) => {
          this.phoneMutation = mutation;
          return (
            <PhoneLoginPresenter
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              loading={loading}
            />
          );
        }}
      </PhoneSignInMutation>
    );
  }
}

export default PhoneLoginContainer;
