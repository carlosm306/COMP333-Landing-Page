// import React from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import { NativeRouter, Routes, Route, Link } from 'react-router-native';

// // HomeScreen Component
// const HomeScreen = () => (
//   <View style={styles.container}>
//     <Text>Home Screen</Text>
//     {/* Using TouchableOpacity for navigation */}
//     <Link to="/signup" underlayColor="#f0f4f7">
//       <TouchableOpacity>
//         <Text>Go to Sign Up</Text>
//       </TouchableOpacity>
//     </Link>
//   </View>
// );

// // SignupScreen Component
// const SignupScreen = () => (
//   <View style={styles.container}>
//     <Text>Sign Up Screen</Text>
//     <Link to="/" underlayColor="#f0f4f7">
//       <TouchableOpacity>
//         <Text>Go to Home</Text>
//       </TouchableOpacity>
//     </Link>
//   </View>
// );

// // Main App Component
// const App = () => {
//   return (
//     <NativeRouter>
//       <Routes>
//         {/* Defining routes inside Routes */}
//         <Route path="/" element={<HomeScreen />} />
//         <Route path="/signup" element={<SignupScreen />} />
//       </Routes>
//     </NativeRouter>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f3f3f3',
//   },
// });

// export default App;


// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Provider as PaperProvider } from 'react-native-paper';

// import SignInScreen from './screens/SignInScreen';
// import SignUpScreen from './screens/SignupScreen';
// import ReviewListScreen from './screens/ReviewListScreen';

// const Stack = createNativeStackNavigator();

// const AuthStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="SignIn" component={SignInScreen} />
//     <Stack.Screen name="SignUp" component={SignUpScreen} />
//   </Stack.Navigator>
// );

// const AppStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Reviews" component={ReviewListScreen} />
//     {/* Add more screens here */}
//   </Stack.Navigator>
// );

// export default function App() {
//   const [isSignedIn, setIsSignedIn] = useState(null);

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       const token = await AsyncStorage.getItem('userToken');
//       setIsSignedIn(!!token);
//     };
//     checkLoginStatus();
//   }, []);

//   if (isSignedIn === null) return null; // or a splash screen

//   return (
//     <PaperProvider>
//       <NavigationContainer>
//         {isSignedIn ? <AppStack /> : <AuthStack />}
//       </NavigationContainer>
//     </PaperProvider>
//   );
// }

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider as PaperProvider } from 'react-native-paper';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignupScreen';
import ReviewListScreen from './screens/ReviewListScreen';

const Stack = createNativeStackNavigator();

const AuthStack = ({ onSignInSuccess }) => (
  <Stack.Navigator>
    <Stack.Screen name="SignIn">
      {(props) => <SignInScreen {...props} onSignInSuccess={onSignInSuccess} />}
    </Stack.Screen>
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Reviews" component={ReviewListScreen} />
    {/* Add more screens here */}
  </Stack.Navigator>
);

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsSignedIn(!!token);
    };
    checkLoginStatus();
  }, []);

  const handleSignInSuccess = (userData) => {
    setIsSignedIn(true); // Set user as signed in upon success
  };

  if (isSignedIn === null) return null; // or a splash screen

  return (
    <PaperProvider>
      <NavigationContainer>
        {isSignedIn ? (
          <AppStack />
        ) : (
          <AuthStack onSignInSuccess={handleSignInSuccess} />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
