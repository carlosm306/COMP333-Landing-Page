import React, { useState, useEffect } from 'react';
import { ScrollView, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

// Function to fetch 3 related images from Openverse
const fetchImages = async (query) => {
  const response = await fetch(`https://api.openverse.engineering/v1/images/?q=${query}&per_page=3`);
  const data = await response.json();
  return data.results.map(image => image.url); // Return the image URLs
};

const ReviewDetailScreen = ({ route }) => {
  const { item } = route.params;
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Fetch images based on movie title
    const getImages = async () => {
      const images = await fetchImages(item.movie);
      setImageUrls(images);
    };

    getImages();

    // Set interval to cycle through images every second
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
    }, 1000);

    // Clear the interval when component is unmounted
    return () => clearInterval(interval);
  }, [item.movie, imageUrls.length]);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Title style={{ fontSize: 24, marginBottom: 10 }}>{item.movie}</Title>
      <Card style={{ marginBottom: 16 }}>
        {/* Display cycling images */}
        {imageUrls.length > 0 && (
          <Card.Cover source={{ uri: imageUrls[currentImageIndex] }} />
        )}
        <Card.Content>
          <Paragraph>Rating: {item.rating}/5</Paragraph>
          <Paragraph style={{ marginTop: 10 }}>{item.review}</Paragraph>
          <Paragraph style={{ marginTop: 10, fontStyle: 'italic' }}>
            - {item.username}
          </Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default ReviewDetailScreen;

