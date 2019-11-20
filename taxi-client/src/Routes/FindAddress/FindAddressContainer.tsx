import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import FindAddressPresenter from "./FindAddressPresenter";

class FindAddressContainer extends React.Component<any> {
  public mapRef: any;
  public map: google.maps.Map;

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }

  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.loadMap(latitude, longitude);
  };

  public handleGeoError = () => {
    toast.error("Error in getting your current position");
  };

  public render() {
    return <FindAddressPresenter mapRef={this.mapRef} />;
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
      zoom: 11
    };
    this.map = new maps.Map(mapNode, mapConfig);
  };
}

export default FindAddressContainer;
