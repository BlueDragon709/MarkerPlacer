import React, { Component } from 'react';
import { Marker } from 'react-native-maps';

export default class CustomMarker extends Component {

  render() {
    return (
      <Marker
        coordinate={LatLng = {
          latitude: parseFloat(this.props.coordinate.latitude),
          longitude: parseFloat(this.props.coordinate.longitude)
        }}
        title={this.props.name}
        description="Test1"
      />
    )
  }
}
