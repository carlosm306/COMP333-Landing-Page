import React, { useEffect, useState } from 'react';
import { View, Alert, FlatList, StyleSheet } from 'react-native';
import { Card, Button, Text, Title } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ReviewListScreen = () => {
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        setUsername(storedUsername || '');

        const response = await axios.get('http://172.21.47.1/Backend/index.php/user/list');
        setReviews(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch reviews');
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete", style: "destructive", onPress: async () => {
            try {
              await axios.delete(`http://127.0.0.1/Backend/index.php/review/delete/${id}`);
              setReviews(reviews.filter(review => review.id !== id));
            } catch (error) {
              Alert.alert('Error', 'Failed to delete review');
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.movie}</Title>
        <Text>Rating: {item.rating}</Text>
        <Text>Review: {item.review}</Text>
        <Text>By: {item.username}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => navigation.navigate('ReviewDetail', { id: item.id })}>View</Button>
        {item.username === username && (
          <>
            <Button onPress={() => navigation.navigate('EditReview', { review: item })}>Edit</Button>
            <Button onPress={() => handleDelete(item.id)} textColor="red">Delete</Button>
          </>
        )}
      </Card.Actions>
    </Card>
  );

  return (
    <FlatList
      data={reviews}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default ReviewListScreen;
