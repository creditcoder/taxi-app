import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
// tslint:disable-next-line:no-empty-interface
interface IProps {}
interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneLoginContainer extends React.Component<IProps, IState> {
  public state = {
    countryCode: "+380",
    phoneNumber: ""
  };

  public render() {
    const { countryCode, phoneNumber } = this.state;
    return (
      <PhoneLoginPresenter
        countryCode={countryCode}
        phoneNumber={phoneNumber}
      />
    );
  }
}

export default PhoneLoginContainer;
