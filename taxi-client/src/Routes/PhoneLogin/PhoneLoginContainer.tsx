import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
// tslint:disable-next-line:no-empty-interface
interface IProps {}
interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneLoginContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      countryCode: "+380",
      phoneNumber: ""
    };
  }

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
    console.log(countryCode, phoneNumber);
  };

  public render() {
    const { countryCode, phoneNumber } = this.state;
    return (
      <PhoneLoginPresenter
        countryCode={countryCode}
        phoneNumber={phoneNumber}
        onInputChange={this.onInputChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default PhoneLoginContainer;
