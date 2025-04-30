import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider as PaperProvider } from 'react-native-paper';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignupScreen';
import ReviewListScreen from './screens/ReviewListScreen';
import ReviewDetailScreen from './screens/ReviewDetailScreen';


const Stack = createNativeStackNavigator();

const AuthStack = ({ onSignInSuccess }) => (
  <Stack.Navigator>
    <Stack.Screen name="SignIn">
      {(props) => <SignInScreen {...props} onSignInSuccess={onSignInSuccess} />}
    </Stack.Screen>
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="Reviews">
      {(props) => <ReviewListScreen {...props} onLogout={onLogout} />}
    </Stack.Screen>

  </Stack.Navigator>
);

const AppStack = ({ onLogout }) => (
  <Stack.Navigator>
    <Stack.Screen name="Reviews">
      {(props) => <ReviewListScreen {...props} onLogout={onLogout} />}
    </Stack.Screen>
    <Stack.Screen name="ReviewDetail" component={ReviewDetailScreen} />
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
          <AppStack onLogout={() => setIsSignedIn(false)} />
        ) : (
          <AuthStack onSignIn={() => setIsSignedIn(true)} />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
