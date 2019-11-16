import React from "react";
import { Mutation } from "react-apollo";
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

class SocialLoginContainer extends React.Component<RouteComponentProps, IState> {
  public render() {
    return (
      <LoginMutation mutation={FACEBOOK_CONNECT}>
        <SocialLoginPresenter />
      </LoginMutation>
    );
  }
}

export default SocialLoginContainer;
