import React from "react";
import ReactDOM from "react-dom";
import FindAddressPresenter from "./FindAddressPresenter";

class FindAddressContainer extends React.Component<any> {
  public mapRef: any;
  public map: google.maps.Map;
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat: 50.27,
        lng: 30.3
      },
      zoom: 11
    };
    this.map = new maps.Map(mapNode, mapConfig);
  }

  public render() {
    return <FindAddressPresenter mapRef={this.mapRef} />;
  }
}

export default FindAddressContainer;
