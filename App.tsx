/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
import { NativeRouter, Route, Switch, Redirect, Link, MemoryRouter } from 'react-router-native';
import { Login } from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const App: () => React.ReactElement = () => {
  return (
    <>
      <MemoryRouter>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
      </MemoryRouter>
    </>
  );
};

// const Home = () => <Text style={styles.header}>Home</Text>;

// const About = () => <Text style={styles.header}>About</Text>;

// const Topic = ({ match }: any) => (
//   <Text style={styles.topic}>{match.params.topicId}</Text>
// );

// const Topics = ({ match }: any) => (
//   <View>
//     <Text style={styles.header}>Topics</Text>
//     <View>
//       <Link
//         to={`${match.url}/rendering`}
//         style={styles.subNavItem}
//         underlayColor="#f0f4f7"
//       >
//         <Text>Rendering with React</Text>
//       </Link>
//       <Link
//         to={`${match.url}/components`}
//         style={styles.subNavItem}
//         underlayColor="#f0f4f7"
//       >
//         <Text>Components</Text>
//       </Link>
//       <Link
//         to={`${match.url}/props-v-state`}
//         style={styles.subNavItem}
//         underlayColor="#f0f4f7"
//       >
//         <Text>Props v. State</Text>
//       </Link>
//     </View>

//     <Route path={`${match.path}/:topicId`} component={Topic} />
//     <Route
//       exact
//       path={match.path}
//       render={() => (
//         <Text style={styles.topic}>Please select a topic.</Text>
//       )}
//     />
//   </View>
// );

// const App = () => (
//   <NativeRouter>
//     <View style={styles.container}>
//       <View style={styles.nav}>
//         <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
//           <Text>Home</Text>
//         </Link>
//         <Link
//           to="/about"
//           underlayColor="#f0f4f7"
//           style={styles.navItem}
//         >
//           <Text>About</Text>
//         </Link>
//         <Link
//           to="/topics"
//           underlayColor="#f0f4f7"
//           style={styles.navItem}
//         >
//           <Text>Topics</Text>
//         </Link>
//       </View>

//       <Route exact path="/" component={Home} />
//       <Route path="/about" component={About} />
//       <Route path="/topics" component={Topics} />
//     </View>
//   </NativeRouter>
// );

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

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// AppRegistry.registerComponent("MyApp", () => App);
export default App;
