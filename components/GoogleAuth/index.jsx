import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import FetchLocation from '../FetchLocation';

const GoogleAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  GoogleSignin.configure({
    webClientId:
      '508193151863-atm9hl46ns16an7u1pq783ttvhr3bpr1.apps.googleusercontent.com',
  });

  // Using this method user will signIn with google Auth. 
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserData(userInfo);
      setLoggedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled', 'Sign in process has been cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play services not available or outdated');
      } else {
        Alert.alert('Error', 'Something went wrong');
        console.error(error);
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setLoggedIn(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {!loggedIn && (
        <Image
          source={require('../../assets/gIcon.png')}
          style={{height: 50, width: 50, borderRadius: 50, marginBottom: 15}}
        />
      )}
      {loggedIn && (
        <View style={styles.userInfoContainer}>
          <Image
            source={{uri: userData?.user?.photo}}
            style={styles.userImage}
          />
          <Text style={styles.userInfoText}>{userData?.user?.name}</Text>
          <Text style={styles.userInfoText}>{userData?.user?.email}</Text>
        </View>
      )}
      <TouchableOpacity
        style={loggedIn ? styles.signOutButton : styles.signInButton}
        onPress={loggedIn ? signOut : signIn}>
        <Text style={styles.buttonText}>
          {loggedIn ? 'Sign Out' : 'Sign In with Google'}
        </Text>
      </TouchableOpacity>

      {loggedIn && <FetchLocation />}
    </View>
  );
};

export default GoogleAuth;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  signInButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  signOutButton: {
    backgroundColor: '#DB4437',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
