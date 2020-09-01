/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useReducer, createContext, useMemo, useCallback } from 'react';

import {
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { authService as auth } from './_services/auth_user';

import { AuthContext } from './_contexts/Contexts';
import { Login } from './components/login/Login';
import FetchFromStorage from './_services/FetchFromStorage'
import Register from './components/Register';
import { ConnectedHome } from './components/home/ConnectedHome';
import Profile from './components/Profile';
import { ConnectedFriends} from './components/friends/ConnectedFriends';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { graphqlClient, clientPromise } from './graphql/client';
import { SafeAreaView, Text } from 'react-native';
// import { REACT_APP_API_URL, REACT_APP_GRAPHQL } from 'react-native-dotenv';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const { getAccessToken } = FetchFromStorage;

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const [state, dispatch] = useReducer(
    (prevState: any, action: any) => {
      console.log(`action: ${action}`)
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
    const bootstrapAsync = async () => {
      let userToken;
      await clientPromise();
      
      try {
        userToken = await getAccessToken();
        console.log(userToken)
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      setIsLoaded(true);
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
        
        // let token = ;
        // console.log('token: ', token)
        dispatch({ type: 'SIGN_IN', token: await auth.login(username, password) });
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
  const renderApp = useCallback(() => {
    return (
      <ApolloProvider client={graphqlClient}>
        <AuthContext.Provider value={authContext}>
          {/* <NavigationContainer> */}
              {state.token === null || state.token === undefined ? (
                <Stack.Navigator>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                </Stack.Navigator>
              ) : (
                <Tab.Navigator
                  screenOptions={({ route }: any) => ({
                    tabBarIcon: () => {
                      if (route.name === 'Friends') {
                        return <Image source={require('./imgs/icons8-friends-25.png')} />
                      }
                      else if (route.name === 'Profile') {
                        return <Image source={require('./imgs/icons8-male-user-24.png')} />
                      }
                      else {
                        return <Image source={require('./imgs/icons8-wish-list-24.png')} />
                      }
                    }
                  })}
                >
                  <Tab.Screen 
                    name="Wish List"
                    component={ConnectedHome}
                    /*options={{
                      headerRight: () => (
                        <Button 
                          onPress={() => console.log('this will open a page to add something')}
                          title="Add Item"/>
                      ),
                    }} */ />
                  <Tab.Screen name="Friends" component={ConnectedFriends} />
                  <Tab.Screen name="Profile" component={Profile} />
                </Tab.Navigator>
              )}
          {/* </NavigationContainer> */}
        </AuthContext.Provider>
      </ApolloProvider>
    )
  }, [state]);

  return (
    <NavigationContainer>
      { isLoaded ? renderApp() : <Text>Loading</Text>}
    </NavigationContainer>
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
