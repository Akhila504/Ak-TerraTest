import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import LoadingIndicator from '../util/LoadingIndicator';

const UsersLocations = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        if (json.length) {
          const usersData = json.map(p => {
            const ini = (p.name || '').split(' ');
            let initials = '';
            if (ini.length > 2) {
              initials = ini[0].charAt(0) + ini[1].charAt(0);
            } else {
              initials = ini[0].charAt(0) + ini[0].charAt(1);
            }
            return {
              id: p.id,
              name: p.name,
              email: p.email,
              latitude: (p.address.geo && p.address.geo.lat) || '',
              longitude: (p.address.geo && p.address.geo.lng) || '',
              initials: (initials || '').toUpperCase(),
            };
          });
          setUsersData([
            {
              id: 6,
              name: 'Akhila',
              email: 'akhila@test.com',
              latitude: '17.449641311637123',
              longitude: '78.38674660369384',
              initials: 'AL',
            },
            {
              id: 8,
              name: 'Akhil',
              email: 'akhil@test.com',
              latitude: '17.438713945741494',
              longitude: '78.384738925482674',
              initials: 'AK',
            },
            ...usersData,
          ]);
        }
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  const onMarkerClick = userId => {
    console.log('onMarkerClick==>', userId);
    navigation.navigate('ME', {userId: userId});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 17.449641311637123,
            longitude: 78.38674660369384,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          {usersData.map((user, idx) => {
            return (
              <Marker
                key={idx}
                coordinate={{
                  latitude: parseFloat(user.latitude),
                  longitude: parseFloat(user.longitude),
                }}
                onPress={() => onMarkerClick(user.id)}>
                <View
                  style={
                    (styles.marker,
                    {
                      backgroundColor: '#ccc',
                      borderRadius: 35,
                    })
                  }>
                  <Image
                    source={require('../assets/user.png')}
                    style={(styles.marker, {marginBottom: 12})}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      position: 'absolute',
                      zIndex: 999,
                      bottom: 0,
                      fontWeight: '800',
                      color: 'blue',
                    }}>
                    {user.initials}
                  </Text>
                </View>

                <Callout>
                  <View
                    style={{width: 60, padding: 10, backgroundColor: 'gray'}}>
                    <Text>{user.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      )}
    </SafeAreaView>
  );
};

export default UsersLocations;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    height: 60,
    width: 60,
  },
});
