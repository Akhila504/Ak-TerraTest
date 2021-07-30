import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import LoadingIndicator from '../util/LoadingIndicator';

const ProfileScreen = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(1);
  const [todosCount, setTodosCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let userId = 1;
    if (route.params) {
      userId = route.params.userId || 1;
    }
    console.log(
      'ProfileScreen',
      `https://jsonplaceholder.typicode.com/users?id=${userId}`,
    );
    fetch(`https://jsonplaceholder.typicode.com/users?id=${userId}`)
      .then(response => response.json())
      .then(json => {
        if (json.length) {
          setUserData(json[0]);
        }
      })
      .catch(error => console.error(error));

    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        if (json.length) {
          setTodosCount(json.length);
        }
      })
      .catch(error => console.error(error));

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        if (json.length) {
          setPostsCount(json.length);
        }
      })
      .catch(error => console.error(error));
    setIsLoading(false);
    setUserId(userId);
  }, [route.params]);

  if (isLoading) {
    return <LoadingIndicator />;
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle={'white-content'} />

        <ImageBackground
          source={{
            uri: 'https://api.time.com/wp-content/uploads/2021/02/laptop-home-office.jpg',
          }}
          style={styles.container}>
          <View style={styles.overlay}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
                color: 'white',
              }}>
              <Image
                source={require('../assets/settings.png')}
                style={styles.tinyLogo}
              />
              <Text style={{...styles.textStyle, marginTop: 8}}>Me</Text>
              <Image
                source={require('../assets/logout.png')}
                style={{...styles.tinyLogo, marginRight: 8}}
              />
            </View>
            <Image
              source={{
                uri: 'https://i.pinimg.com/originals/c8/f7/a8/c8f7a86a5a668cac7a2846073ce4baf3.jpg',
              }}
              style={styles.avatarStyle}
            />
            <Text
              style={{...styles.textStyle, fontSize: 18, fontWeight: 'bold'}}>
              {userData.name}
            </Text>
            <Text style={{...styles.textStyle, fontSize: 14}}>
              {userData.company &&
                (userData.company.bs || '').charAt(0).toUpperCase() +
                  (userData.company.bs || '').substring(
                    1,
                    userData.company.bs.length,
                  )}
            </Text>
            <Text style={styles.textStyle}>
              {(userData.company && userData.company.name) || 'Company Name'}
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text style={styles.textStyle}>
                Lat: {(userData.address && userData.address.geo.lat) || ''}
              </Text>
              <Text style={{...styles.textStyle, paddingLeft: 80}}>
                Lng: {(userData.address && userData.address.geo.lng) || ''}
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TO-DOs', {userId: userId})}>
            <Text style={styles.textDesignStyles}> Todo: {todosCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('POSTS', {userId: userId})}>
            <Text style={styles.textDesignStyles}> Posts: {postsCount}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {},
  overlay: {
    backgroundColor: 'rgba(48,48,46,0.8)',
    paddingBottom: 12,
  },
  tinyLogo: {
    width: 24,
    height: 24,
    marginLeft: 8,
    marginTop: 8,
  },
  avatarStyle: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    alignSelf: 'center',
  },
  textDesignStyles: {
    fontSize: 20,
    fontWeight: '800',
    justifyContent: 'center',
    marginTop: 15,
    alignSelf: 'center',
  },
});

export default ProfileScreen;
