/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useState, useEffect, useReducer, createContext, useMemo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AppRegistry,
} from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import { NativeRouter, Route, Switch, Redirect, Link, MemoryRouter } from 'react-router-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import { authService as auth } from './_services/auth_user';

import { AuthContext } from './_contexts/Contexts';
import { Login } from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { dispatch } from 'rxjs/internal/observable/pairs';

const Stack = createStackNavigator();


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
            token: undefined,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      token: undefined,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    console.log("here")
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('token');
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
        dispatch({ type: 'SIGN_OUT', token: undefined })
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
  // state.token = undefined;
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.token === undefined ? (
            <>
              <Stack.Screen name="Sign into Wish List" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
            </>
          )}
        </Stack.Navigator>
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
