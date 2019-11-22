import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { geoCode, reverseGeoCode } from "../../mapHelpers";
import FindAddressPresenter from "./FindAddressPresenter";

interface IState {
  address: string;
  lat: number;
  lng: number;
}

class FindAddressContainer extends React.Component<any, IState> {
  public mapRef: any;
  public map: google.maps.Map;

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      address: "",
      lat: 0,
      lng: 0
    };
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
    this.setState({
      lat: latitude,
      lng: longitude
    });
    this.loadMap(latitude, longitude);
    this.reverseGeocodeAddress(latitude, longitude);
  };

  public handleGeoError = () => {
    toast.error("Error in getting your current position");
  };

  public render() {
    const { address } = this.state;
    return (
      <FindAddressPresenter
        mapRef={this.mapRef}
        address={address}
        onInputChange={this.onInputChange}
        onInputBlur={this.onInputBlur}
        onPickPlace={this.onPickPlace}
      />
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
      zoom: 11
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map.addListener("dragend", this.handleDragEnd);
  };

  public handleDragEnd = async () => {
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    this.setState({
      lat,
      lng
    });
    this.reverseGeocodeAddress(lat, lng);
  };

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    this.setState(({
      [name]: value
    } as unknown) as IState);
  };

  public onInputBlur = async () => {
    const { address } = this.state;
    const result = await geoCode(address);
    if (result !== false) {
      const { lat, lng, formatted_address } = result;
      this.setState({
        address: formatted_address,
        lat,
        lng
      });
      // pushing map to new center with coords (lat, lng)
      this.map.panTo({ lat, lng });
    }
  };

  public onPickPlace = () => {
    const {address, lat, lng} = this.state;
    const {history} = this.props;
    history.push({
      pathname: "/add-place",
      state: {
        address,
        lat,
        lng
      }
    })
  };

  public reverseGeocodeAddress = async (lat: number, lng: number) => {
    const reversedAddress = await reverseGeoCode(lat, lng);
    if (reversedAddress !== false) {
      this.setState({
        address: reversedAddress
      });
    }
  };
}

export default FindAddressContainer;
