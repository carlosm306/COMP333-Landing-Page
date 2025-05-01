import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation, onSignInSuccess }) => {  // Add `navigation` prop here
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!username || !password) {
      Alert.alert('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      // Replace with your actual backend endpoint
      const response = await fetch('http://172.21.47.1/Backend/index.php/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.user) {
        throw new Error(data?.error || 'Login failed');
      }

      // Save the token and username in AsyncStorage
      await AsyncStorage.setItem('userToken', data.token || 'mock-token');
      await AsyncStorage.setItem('username', username);
      onSignInSuccess();

    //   // Call success handler (e.g. to set auth state in App.js)
    //   onSignInSuccess(data.user);

    //   // Navigate to the review page after successful login
    //   navigation.replace('Reviews'); 
    } catch (error) {
      Alert.alert('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Sign In</Title>

          <TextInput
            label="Username"
            mode="outlined"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleSignIn}
            loading={loading}
            style={styles.button}
          >
            Sign In
          </Button>

          <Button
            mode="text"  // Make this a text button for better UI
            onPress={() => navigation.navigate('SignUp')} // This uses the navigation prop
          >
            Go to Sign Up
          </Button>

        </Card.Content>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f3f3f3',
  },
  card: {
    padding: 16,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
  },
});

