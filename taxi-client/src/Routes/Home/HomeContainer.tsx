import React from "react";
import { Query } from "react-apollo";
import ReactDOM from "react-dom";
import { USER_PROFILE } from "../../sharedQueries";
import { userProfile } from "../../types/api";
import HomePresenter from "./HomePresenter";

interface IState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
}

interface IProps {
  google: any;
}

class ProfileQuery extends Query<userProfile> {}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public userMarker: google.maps.Marker;
  public state = {
    isMenuOpen: false,
    lat: 0,
    lng: 0
  };
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  public render() {
    const { isMenuOpen } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ loading }) => (
          <HomePresenter
            loading={loading}
            isMenuOpen={isMenuOpen}
            toggleMenu={this.toggleMenu}
            mapRef={this.mapRef}
          />
        )}
      </ProfileQuery>
    );
  }

  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      minZoom: 8,
      zoom: 11
    };
    this.map = new maps.Map(mapNode, mapConfig);
  };
  
  public toggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      };
    });
  };
}

export default HomeContainer;
