/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, Text, View, KeyboardAvoidingView, Button, TextInput } from 'react-native';

import shortid from 'shortid';
import MapView from 'react-native-maps';
import Config from 'react-native-config';

import CustomMarker from './Components/CustomMarker'

export default class App extends Component {

  state = {
    wantedLocation: "",
    wlLatLong: {
      latitude: 0,
      longitude: 0
    },
    markers: [],
    markerToShow: "all"
  };

  handleTextInput = name => event => {
    this.setState({
      [name]: event
    });

    console.log("klaar - text")
  }

  getLongLat = async () => {
    let url = `https://eu1.locationiq.com/v1/search.php?key=${Config.GEOCODING_API}&q=${this.state.wantedLocation}&format=json&limit=1`
    const response = await fetch(url)
    const responseJSON = await response.json();

    this.setState({
      wlLatLong: { latitude: responseJSON[0].lat, longitude: responseJSON[0].lon }
    });

    console.log("klaar - Get")

    this.createMarker(this.state.wlLatLong)
  }

  createMarker = marker => {
    console.log("start - Create")

    this.setState(state => ({
      markers: [...state.markers, marker],
      wlLatLong: {}
    }), console.log(this.state.markers));
    console.log("klaar - Create")
  }

  render() {
    let markers = [];

    switch (this.state.markerToShow) {
      case "all":
        markers = this.state.markers;
        break;

      default:
        break;
    }

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="heigth" enabled>
        <MapView
          style={{ flex: 8 }}
          initialRegion={{
            latitude: 51.4664478,
            longitude: 5.49640009999996,
            latitudeDelta: 0.002022,
            longitudeDelta: 0.001021,
          }}
        >
          {markers.map(marker => (
            <CustomMarker
              key={shortid.generate()}
              name={this.state.wantedLocation}
              coordinate={marker}
            />
          ))}
        </MapView>
        <View style={{ flex: 2 }}>
          <Text>Typ een adres in.</Text>
          <TextInput style={{ height: 40 }} placeholder="From..." onChangeText={this.handleTextInput('wantedLocation')} value={this.state.wantedLocation} />
          <Button onPress={this.getLongLat} title="Plaats een marker" />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
