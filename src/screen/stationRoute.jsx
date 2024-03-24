import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';


const fetchRoute = async (start, end) => {
  const apiKey = '5aND0PYr3jmcZtwxm1ilqPEvGAYk3DNV';
  const url = `https://api.tomtom.com/routing/1/calculateRoute/${start.lat},${start.lng}:${end.lat},${end.lng}/json?avoid=unpavedRoads&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    const points = json.routes[0].legs[0].points.map(p => ({
      latitude: p.latitude,
      longitude: p.longitude,
    }));
    return points;
  } catch (error) {
    console.error(error);
    return [];
  }
};


const StationRoute = () => {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    // Example start and end points
    const start = { lat: 52.379189, lng: 4.899431 }; // Amsterdam
    const end = { lat: 48.8566, lng: 2.3522 }; // Paris

    fetchRoute(start, end).then(setRoute);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 52.379189,
          longitude: 4.899431,
          latitudeDelta: 4,
          longitudeDelta: 4,
        }}
      >
        {route.length > 0 && (
          <Polyline coordinates={route} strokeWidth={5} strokeColor="red" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default StationRoute;
