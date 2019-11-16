import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { facebookConnect, facebookConnectVariables } from "../../types/api";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";

class LoginMutation extends Mutation<
  facebookConnect,
  facebookConnectVariables
> {}

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
}

class SocialLoginContainer extends React.Component<
  RouteComponentProps,
  IState
> {
  public state = {
    email: "",
    fbId: "",
    firstName: "",
    lastName: ""
  };
  public facebookMutation: MutationFn;
  public render() {
    const { firstName, lastName, email, fbId } = this.state;
    return (
      <LoginMutation
        mutation={FACEBOOK_CONNECT}
        variables={{ email, fbId, firstName, lastName }}
      >
        {(facebookMutation, { loading }) => {
          this.facebookMutation = facebookMutation;
          return <SocialLoginPresenter loginCallback={this.loginCallback} />;
        }}
      </LoginMutation>
    );
  }

  public loginCallback = response => {
    console.log(response);
    this.facebookMutation();
  };
}

export default SocialLoginContainer;
