import React from "react";
import { Mutation } from "react-apollo";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import SettingsPresenter from "./SettingsPresenter";

class SettingsContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logUserOut => <SettingsPresenter logUserOut={logUserOut} />}
      </Mutation>
    );
  }
}

export default SettingsContainer;
