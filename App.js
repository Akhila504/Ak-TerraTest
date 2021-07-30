import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import UsersLocations from './screens/UsersLocations';
import {HomeIcon} from './assets/home.svg';
import {Image} from 'react-native';
import profileScreen from './screens/ProfileScreen';
import PostsScreen from './screens/PostsScreen';
import TodoScreen from './screens/TodoScreen';

const App = () => {
  const Tab = createBottomTabNavigator();
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="HOME"
          activeTintColor="#f0edf6"
          inactiveTintColor="#3e2465"
          style={{backgroundColor: '#ccc', color: 'black'}}>
          <Tab.Screen
            name="ME"
            component={profileScreen}
            options={{
              tabBarLabel: 'ME',
              tabBarIcon: ({size, focused, color}) => {
                return (
                  <Image
                    style={{width: size, height: size}}
                    source={require('./assets/user.png')}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="HOME"
            component={UsersLocations}
            options={{
              tabBarLabel: 'HOME',
              tabBarIcon: ({size, focused, color}) => {
                return (
                  <Image
                    style={{width: size, height: size}}
                    source={require('./assets/home.png')}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="POSTS"
            component={PostsScreen}
            options={{
              tabBarLabel: 'POSTS',
              tabBarIcon: ({size, focused, color}) => {
                return (
                  <Image
                    style={{width: size, height: size}}
                    source={require('./assets/posts.png')}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="TO-DOs"
            component={TodoScreen}
            options={{
              tabBarLabel: 'TO-DOs',
              tabBarIcon: ({size, focused, color}) => {
                return (
                  <Image
                    style={{width: size, height: size}}
                    source={require('./assets/tasks.png')}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
