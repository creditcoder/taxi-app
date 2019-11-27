import React from "react";
import { graphql, Mutation, MutationFn, Query } from "react-apollo";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { geoCode, reverseGeoCode } from "../../mapHelpers";
import { USER_PROFILE } from "../../sharedQueries";
import {
  acceptRide,
  acceptRideVariables,
  getNearbyDrivers,
  getRide,
  reportMovement,
  reportMovementVariables,
  requestRide,
  requestRideVariables,
  userProfile
} from "../../types/api";
import HomePresenter from "./HomePresenter";
import {
  ACCEPT_RIDE,
  GET_NEARBY_DRIVERS,
  GET_NEARBY_RIDE,
  REPORT_LOCATION,
  REQUEST_RIDE
} from "./HomeQueries";

class ProfileQuery extends Query<userProfile> {}

class NearbyQueries extends Query<getNearbyDrivers> {}

class RequestRideMutation extends Mutation<requestRide, requestRideVariables> {}

class GetNearbyRide extends Query<getRide> {}

class AcceptRide extends Mutation<acceptRide, acceptRideVariables> {}

interface IState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
  toAddress: string;
  toLat: number;
  toLng: number;
  distance?: string;
  duration?: string;
  price?: number;
  fromAddress: string;
  isDriving: boolean;
}

interface IProps {
  google: any;
  reportLocation: MutationFn;
}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public userMarker: google.maps.Marker;
  public toMarker: google.maps.Marker;
  public directions: google.maps.DirectionsRenderer;
  public drivers: google.maps.Marker[];

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.drivers = [];
    this.state = {
      fromAddress: "",
      isDriving: true,
      isMenuOpen: false,
      lat: 0,
      lng: 0,
      toAddress: "",
      toLat: 0,
      toLng: 0
    };
  }

  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSucces,
      this.handleGeoError
    );
  }

  public render() {
    const {
      distance,
      isMenuOpen,
      toAddress,
      price,
      fromAddress,
      toLat,
      toLng,
      lat,
      lng,
      duration,
      isDriving
    } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE} onCompleted={this.handleProfileQuery}>
        {({ data, loading }) => (
          <NearbyQueries
            query={GET_NEARBY_DRIVERS}
            pollInterval={5000}
            skip={isDriving}
            onCompleted={this.handleNearbyDrivers}
          >
            {() => (
              <RequestRideMutation
                mutation={REQUEST_RIDE}
                onCompleted={this.handleRideRequest}
                variables={{
                  distance: distance || "",
                  dropOffAddress: toAddress,
                  dropOffLat: toLat,
                  dropOffLng: toLng,
                  duration: duration || "",
                  pickUpAddress: fromAddress,
                  pickUpLat: lat,
                  pickUpLng: lng,
                  price: price || 0
                }}
              >
                {requestRideFn => (
                  <GetNearbyRide query={GET_NEARBY_RIDE} skip={!isDriving}>
                    {({ data: nearbyRide }) => (
                      <AcceptRide mutation={ACCEPT_RIDE}>
                        {acceptRideFn => (
                          <HomePresenter
                            loading={loading}
                            isMenuOpen={isMenuOpen}
                            toggleMenu={this.toggleMenu}
                            mapRef={this.mapRef}
                            toAddress={toAddress}
                            onAddressSubmit={this.onAddressSubmit}
                            onInputChange={this.onInputChange}
                            price={price}
                            data={data}
                            requestRideFn={requestRideFn}
                            nearbyRide={nearbyRide}
                            acceptRideFn={acceptRideFn}
                          />
                        )}
                      </AcceptRide>
                    )}
                  </GetNearbyRide>
                )}
              </RequestRideMutation>
            )}
          </NearbyQueries>
        )}
      </ProfileQuery>
    );
  }

  public handleProfileQuery = (data: userProfile) => {
    const { GetMyProfile } = data;
    if (GetMyProfile.user) {
      const {
        user: { isDriving }
      } = GetMyProfile;
      if (isDriving) {
        this.setState({ isDriving });
      }
    }
  };

  public handleRideRequest = (data: requestRide) => {
    const { RequestRide } = data;
    if (RequestRide.ok) {
      toast.success("Drive was requested. Finding a driver");
    } else {
      toast.error(RequestRide.error);
    }
  };

  public handleNearbyDrivers = (data: {} | getNearbyDrivers) => {
    if ("GetNearbyDrivers" in data) {
      const {
        GetNearbyDrivers: { drivers, ok }
      } = data;
      if (ok && drivers) {
        for (const driver of drivers) {
          if (driver && driver.lastLat && driver.lastLng) {
            const existingDriver:
              | google.maps.Marker
              | undefined = this.drivers.find(
              (driverMaker: google.maps.Marker) => {
                const markerId = driverMaker.get("ID");
                return markerId === driver.id;
              }
            );

            if (existingDriver) {
              existingDriver.setPosition({
                lat: driver.lastLat,
                lng: driver.lastLng
              });
              existingDriver.setMap(this.map);
            } else {
              const markerOptions: google.maps.MarkerOptions = {
                icon: {
                  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  scale: 5
                },
                position: {
                  lat: driver.lastLat,
                  lng: driver.lastLng
                }
              };
              const newMarker: google.maps.Marker = new google.maps.Marker(
                markerOptions
              );
              newMarker.set("ID", driver.id);
              newMarker.setMap(this.map);
              this.drivers.push(newMarker);
            }
          }
        }
      }
    }
  };

  public handleGeoSucces: PositionCallback = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.setState({
      lat: latitude,
      lng: longitude
    });
    this.getFromAddress(latitude, longitude);
    this.loadMap(latitude, longitude);
  };

  public handleGeoError: PositionErrorCallback = () => {
    toast.error("Error in getting your current position");
  };

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    this.setState(({ [name]: value } as unknown) as IState);
  };

  public onAddressSubmit = async () => {
    const { toAddress } = this.state;
    const {
      google: { maps }
    } = this.props;
    const result = await geoCode(toAddress);
    if (result !== false) {
      const { lat, lng, formatted_address } = result;
      if (this.toMarker) {
        // delete already existing route to finish ride address
        this.toMarker.setMap(null);
      }
      const toMarkerOptions: google.maps.MarkerOptions = {
        position: {
          lat,
          lng
        }
      };
      this.toMarker = new maps.Marker(toMarkerOptions);
      this.toMarker.setMap(this.map);
      const bounds = new maps.LatLngBounds();
      bounds.extend({ lat: this.state.lat, lng: this.state.lng });
      bounds.extend({ lat, lng });
      this.map.fitBounds(bounds);
      this.setState(
        {
          toAddress: formatted_address,
          toLat: lat,
          toLng: lng
        },
        this.createPath
      );
    }
  };

  public handleRouteRequest = (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const { routes } = result;
      const {
        distance: { text: distance },
        duration: { text: duration }
      } = routes[0].legs[0];
      this.setState(
        {
          distance,
          duration
        },
        this.setPrice
      );
      this.directions.setDirections(result);
      this.directions.setMap(this.map);
    } else {
      toast.error("There is no way. You have to swim");
    }
  };

  public setPrice = () => {
    const { distance } = this.state;
    if (distance) {
      this.setState({
        price: parseFloat(distance.replace(",", ""))
      });
    }
  };

  public createPath = () => {
    const { toLat, toLng, lat, lng } = this.state;
    if (this.directions) {
      this.directions.setMap(null);
    }
    const renderOptions: google.maps.DirectionsRendererOptions = {
      polylineOptions: {
        strokeColor: "#000"
      },
      suppressMarkers: true
    };
    this.directions = new google.maps.DirectionsRenderer(renderOptions);
    const directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
    const to = new google.maps.LatLng(toLat, toLng);
    const from = new google.maps.LatLng(lat, lng);
    const directionOptions: google.maps.DirectionsRequest = {
      destination: to,
      origin: from,
      travelMode: google.maps.TravelMode.DRIVING
    };
    // here can setState loading to display loading on button
    directionsService.route(directionOptions, this.handleRouteRequest);
  };

  public getFromAddress = async (lat: number, lng: number) => {
    const address = await reverseGeoCode(lat, lng);
    if (address) {
      this.setState({
        fromAddress: address
      });
    }
  };

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
      zoom: 14
    };
    this.map = new maps.Map(mapNode, mapConfig);
    const userMarkerOptions: google.maps.MarkerOptions = {
      icon: {
        path: maps.SymbolPath.CIRCLE,
        scale: 7
      },
      position: {
        lat,
        lng
      }
    };
    this.userMarker = new maps.Marker(userMarkerOptions);
    this.userMarker.setMap(this.map);
    const watchOptions: PositionOptions = {
      enableHighAccuracy: true
    };
    navigator.geolocation.watchPosition(
      this.handleGeoWatchSuccess,
      this.handleGeoWatchError,
      watchOptions
    );
  };

  public handleGeoWatchSuccess = (position: Position) => {
    const { reportLocation } = this.props;
    const {
      coords: { latitude, longitude }
    } = position;
    this.userMarker.setPosition({ lat: latitude, lng: longitude });
    this.map.panTo({ lat: latitude, lng: longitude });
    reportLocation({
      variables: {
        lat: latitude,
        lng: longitude
      }
    });
  };

  public handleGeoWatchError = () => {
    toast.error("An error occured in getting your position");
  };

  public toggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      };
    });
  };
}

export default graphql<any, reportMovement, reportMovementVariables>(
  REPORT_LOCATION,
  { name: "reportLocation" }
)(HomeContainer);
