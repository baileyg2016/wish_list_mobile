/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useState, useEffect, useReducer, createContext, useMemo } from 'react';
import {
  StyleSheet,
  Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { authService as auth } from './_services/auth_user';

import { AuthContext } from './_contexts/Contexts';
import { Login } from './components/Login';
import FetchFromStorage from './_services/FetchFromStorage'
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import Friends from './components/Friends';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const { getAccessToken } = FetchFromStorage;


const App = () => {
  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      console.log(action)
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            token: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            token: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            token: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      token: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    console.log("here")
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await getAccessToken;
        console.log(userToken)
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      logIn: async (username: string, password: string) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        
        // let token = await auth.login(username, password);
        // console.log(token)
        dispatch({ type: 'SIGN_IN', token: await auth.login(username, password) });
        // console.log(state.token)
      },
      logOut: () => {
        auth.logout();
        dispatch({ type: 'SIGN_OUT', token: null })
      },
      register: async (firstName: string, lastName: string, username: string, password: string) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        // let token = ;
        dispatch({ type: 'SIGN_IN', token: await auth.register(firstName, lastName, username, password) });
      },
    }),
    []
  );

  // AsyncStorage.clear();
  // authContext.logOut();
  // state.token = null;
  console.log(state)
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
          {state.token === null || state.token === undefined ? (
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator>
              <Tab.Screen name="Profile" component={Profile} />
              <Tab.Screen 
                name="Home"
                component={Home}
                /*options={{
                  headerRight: () => (
                    <Button 
                      onPress={() => console.log('this will open a page to add something')}
                      title="Add Item"/>
                  ),
                }} */ />
              <Tab.Screen name="Friends" component={Friends} />
            </Tab.Navigator>
          )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  }
});

// AppRegistry.registerComponent("MyApp", () => App);
export default App;
