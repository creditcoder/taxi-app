import React from "react";
import { Mutation } from "react-apollo";
import { GET_PLACES } from "../../sharedQueries";
import { editPlace, editPlaceVariables } from "../../types/api";
import PlacePresenter from "./PlacePresenter";
import { EDIT_PLACE } from "./PlaceQueries";

class ToggleFavMutation extends Mutation<editPlace, editPlaceVariables> {}

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  id: number;
}

class PlaceContainer extends React.Component<IProps> {
  public render() {
    const { fav, name, address, id } = this.props;
    return (
      <ToggleFavMutation
        mutation={EDIT_PLACE}
        variables={{ isFav: !fav, placeId: id }}
        refetchQueries={[{ query: GET_PLACES }]}
      >
        {editPlaceFn => (
          <PlacePresenter
            onStarPress={editPlaceFn}
            isFav={fav}
            name={name}
            address={address}
          />
        )}
      </ToggleFavMutation>
    );
  }
}

export default PlaceContainer;
