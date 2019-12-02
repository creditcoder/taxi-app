import React from "react";
import { Query } from "react-apollo";
import { getMyRides } from "../../types/api";
import TripsPresenter from "./TripsPresenter";
import { GET_MY_RIDES } from "./TripsQueries";

class GetMyRidesQuery extends Query<getMyRides> {}

class TripsContainer extends React.Component {
  public render() {
    return (
      <GetMyRidesQuery query={GET_MY_RIDES}>
        {({ data, loading }) => (
          <TripsPresenter data={data} loading={loading} />
        )}
      </GetMyRidesQuery>
    );
  }
}

export default TripsContainer;
