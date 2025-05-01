import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation, onSignInSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://172.21.47.1/Backend/index.php/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Signup failed');
      }

      // Save token or user info if provided (optional)
      await AsyncStorage.setItem('userToken', data.token || 'mock-token');
      // await AsyncStorage.setItem('username', username);
      onSignInSuccess();
    } catch (error) {
      Alert.alert('Signup Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Sign Up</Title>

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
          <TextInput
            label="Confirm Password"
            mode="outlined"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleSignup}
            loading={loading}
            style={styles.button}
          >
            Sign Up
          </Button>

          <Button onPress={() => navigation.navigate('SignIn')} style={styles.link}>
            Already have an account? Sign In
          </Button>

          <Button onPress={() => navigation.navigate('Game')} style={styles.link}>
            Not sure yet? Play game
          </Button>

        </Card.Content>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

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
  link: {
    marginTop: 8,
  },
});
