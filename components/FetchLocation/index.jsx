import React, {useEffect, useState} from 'react';
import {View, Text,  PermissionsAndroid, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const FetchLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Request permission and obtain the user's current location
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }

      Geolocation.getCurrentPosition(
        position => {
          setLatitude(position?.coords?.latitude);
          setLongitude(position?.coords?.longitude);
        },
        err => {
          console.log(err);
          setError(err);
        },
        {enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000},
      );
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Location Points</Text>
      {latitude && longitude ? (
        <View style={styles.locationInfoContainer}>
          <Text style={styles.locationText}>Latitude: {latitude}</Text>
          <Text style={styles.locationText}>Longitude: {longitude}</Text>
        </View>
      ) : (
        <Text style={styles.fetchingText}>
          {error ? `Error: ${error}` : 'Fetching location...'}
        </Text>
      )}
    </View>
  );
};

export default FetchLocation;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 18,
    marginBottom: 10,
  },
  fetchingText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
