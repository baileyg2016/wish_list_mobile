/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useReducer, useMemo, useCallback } from 'react';

import {
  StyleSheet,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { authService as auth } from './_services/auth_user';

import { AuthContext } from './_contexts/Contexts';
import { Login } from './components/login/Login';
import FetchFromStorage from './_services/FetchFromStorage'
import Register from './components/login/Register';
import { ConnectedHome } from './components/home/ConnectedHome';
import Profile from './components/Profile';
import { ConnectedFriends} from './components/friends/ConnectedFriends';
import { ApolloProvider } from '@apollo/client';
import { graphqlClient, clientPromise } from './graphql/client';
import { Text } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const { getAccessToken } = FetchFromStorage;

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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
      logIn: async (jwt: string, firstName: string, lastName: string) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        console.log(jwt, firstName, lastName)
        const token = await auth.login(jwt, firstName, lastName);
        // console.log('token: ', token)
        dispatch({ type: 'SIGN_IN', token });
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
  
  const renderApp = useCallback(() => {
    return (
      <ApolloProvider client={graphqlClient}>
        <AuthContext.Provider value={authContext}>
              {state.token === null || state.token === undefined ? (
                  <AuthContext.Consumer>
                  {
                    auth => 
                      (
                        <Stack.Navigator>
                          <Stack.Screen name="Login">
                            {props => <Login {...props} auth={auth} />}
                          </Stack.Screen>
                          <Stack.Screen name="Register">
                            {props => <Register {...props} auth={auth} />}
                          </Stack.Screen>
                        </Stack.Navigator>
                      )
                  }
                </AuthContext.Consumer>
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

// AppRegistry.registerComponent("MyApp", () => App);
export default App;
