// import React, { useEffect, useState } from 'react';
// import { View, Alert, FlatList, StyleSheet } from 'react-native';
// import {
//   Card,
//   Button,
//   Text,
//   Title,
//   TextInput,
//   Dialog,
//   Portal,
//   Provider,
// } from 'react-native-paper';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const ReviewListScreen = ({onLogout}) => {
//   const [reviews, setReviews] = useState([]);
//   const [username, setUsername] = useState('');
//   const [showDialog, setShowDialog] = useState(false);
//   const [newReview, setNewReview] = useState({ movie: '', rating: '', review: '' });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingId, setEditingId] = useState(null);


//   const navigation = useNavigation();

//   const fetchData = async () => {
//     try {
//       const storedUsername = await AsyncStorage.getItem('username');
//       setUsername(storedUsername || '');

//       const response = await axios.get('http://172.21.47.1/Backend/index.php/user/list');
//       setReviews(response.data);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch reviews');
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     Alert.alert(
//       "Confirm Delete",
//       "Are you sure you want to delete this review?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete", style: "destructive", onPress: async () => {
//               try {
//                 const response = await axios.post('http://172.21.47.1/Backend/index.php/user/delete', {
//                   id: id
//                 });
          
//                 Alert.alert("Delete Response", response.data);
//                 fetchData();
//             } catch (error) {
//               Alert.alert('Error', 'Failed to delete review');
//             }
//           }
//         }
//       ]
//     );
//   };

// //   const handleAddReview = async () => {
// //     if (!newReview.movie || !newReview.rating || !newReview.review) {
// //       Alert.alert('Validation', 'All fields are required');
// //       return;
// //     }

// //     try {
// //       await axios.post('http://172.21.47.1/Backend/index.php/user/writereview', {
// //         movie: newReview.movie,
// //         rating: newReview.rating,
// //         review: newReview.review,
// //         username: username,
// //       });
// //       setShowDialog(false);
// //       setNewReview({ movie: '', rating: '', review: '' });
// //       fetchData(); // Refresh list
// //     } catch (error) {
// //       Alert.alert('Error', 'Failed to add review');
// //     }
// //   };

// const handleAddReview = async () => {
//     if (!newReview.movie || !newReview.rating || !newReview.review) {
//       Alert.alert('Validation', 'All fields are required');
//       return;
//     }
  
//     try {
//       const storedUsername = await AsyncStorage.getItem('username');
//       if (!storedUsername) {
//         Alert.alert('Error', 'User not logged in');
//         return;
//       }
  
//       await axios.post('http://172.21.47.1/Backend/index.php/user/writereview', {
//         movie: newReview.movie,
//         rating: newReview.rating,
//         review: newReview.review,
//         username: storedUsername,
//       });
  
//       setShowDialog(false);
//       setNewReview({ movie: '', rating: '', review: '' });
//       fetchData(); // Refresh the list
//     } catch (error) {
//       Alert.alert('Error', 'Failed to add review');
//     }
//   };

//   const handleUpdateReview = async () => {
//     if (!newReview.movie || !newReview.rating || !newReview.review) {
//       Alert.alert('Validation', 'All fields are required');
//       return;
//     }
  
//     try {
//       await axios.post('http://172.21.47.1/Backend/index.php/user/update', {
//         id: editingId,
//         movie: newReview.movie,
//         rating: newReview.rating,
//         review: newReview.review,
//       });
  
//       Alert.alert('Success', 'Review updated');
//       setShowDialog(false);
//       setIsEditing(false);
//       setEditingId(null);
//       setNewReview({ movie: '', rating: '', review: '' });
//       fetchData();
//     } catch (error) {
//       Alert.alert('Error', 'Failed to update review');
//     }
//   };
  
  

//   const renderItem = ({ item }) => (
//     <Card style={styles.card}>
//       <Card.Content>
//         <Title>{item.movie}</Title>
//         <Text>Rating: {item.rating}</Text>
//         <Text>Review: {item.review}</Text>
//         <Text>By: {item.username}</Text>
//       </Card.Content>
//       <Card.Actions>
//         {/* <Button onPress={() => navigation.navigate('ReviewDetail', { id: item.id })}>View</Button>
//          */}
//          <Button
//         mode="outlined"
//         onPress={() => navigation.navigate('ReviewDetail', { item })}
//         >
//         View
//         </Button>

//         {item.username === username && (
//           <>
//             <Button onPress={() => {
//             setNewReview({ movie: item.movie, rating: item.rating, review: item.review });
//             setEditingId(item.id);
//             setIsEditing(true);
//             setShowDialog(true);
//             }}>Edit</Button>
//             <Button onPress={() => handleDelete(item.id)} textColor="red">Delete</Button>
//           </>
//         )}
//       </Card.Actions>
//     </Card>
//   );

// //   const handleLogout = async () => {
// //     try {
// //       await AsyncStorage.removeItem('username');
// //       await AsyncStorage.removeItem('userToken');
// //       onLogout(); 
// //     } catch (error) {
// //       Alert.alert('Error', 'Failed to log out');
// //     }
// //   };

// const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem('username');
//       await AsyncStorage.removeItem('userToken');
  
//       if (typeof onLogout !== 'function') {
//         throw new Error('onLogout is not a function');
//       }
  
//       onLogout();
//     } catch (error) {
//       console.error('Logout error:', error); // More detailed error output
//       Alert.alert('Error', 'Failed to log out');
//     }
//   };
  
  

//   return (
//     <Provider>
        
//         <Button
//             mode="outlined"
//             onPress={handleLogout}
//             style={{ margin: 10 }}
//             >
//             Logout
//         </Button>

//       <FlatList
//         data={reviews}
//         keyExtractor={item => item?.id?.toString?.() ?? Math.random().toString()}
//         renderItem={renderItem}
//         contentContainerStyle={styles.list}
//       />
//       <Button
//         mode="contained"
//         onPress={() => setShowDialog(true)}
//         style={styles.addButton}
//       >
//         Add Review
//       </Button>

//       {/* <Portal>
//         <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
//           <Dialog.Title>Add New Review</Dialog.Title>
//           <Dialog.Content>
//             <TextInput
//               label="Movie"
//               value={newReview.movie}
//               onChangeText={(text) => setNewReview({ ...newReview, movie: text })}
//               style={styles.input}
//             />
//             <TextInput
//               label="Rating"
//               keyboardType="numeric"
//               value={newReview.rating}
//               onChangeText={(text) => setNewReview({ ...newReview, rating: text })}
//               style={styles.input}
//             />
//             <TextInput
//               label="Review"
//               multiline
//               value={newReview.review}
//               onChangeText={(text) => setNewReview({ ...newReview, review: text })}
//               style={styles.input}
//             />
//           </Dialog.Content>
//           <Dialog.Actions>
//             <Button onPress={() => setShowDialog(false)}>Cancel</Button>
//             <Button onPress={handleAddReview}>Submit</Button>
//           </Dialog.Actions>
//         </Dialog>
//       </Portal> */}

// {/* <Portal>
//   <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
//     <Dialog.Title>Add New Review</Dialog.Title>
//     <Dialog.Content>
//       <TextInput
//         label="Movie"
//         value={newReview.movie}
//         onChangeText={(text) => setNewReview({ ...newReview, movie: text })}
//         style={{ marginBottom: 10 }}
//       />
//       <TextInput
//         label="Rating"
//         value={newReview.rating}
//         onChangeText={(text) => setNewReview({ ...newReview, rating: text })}
//         keyboardType="numeric"
//         style={{ marginBottom: 10 }}
//       />
//       <TextInput
//         label="Review"
//         value={newReview.review}
//         onChangeText={(text) => setNewReview({ ...newReview, review: text })}
//         multiline
//         style={{ marginBottom: 10 }}
//       />
//       <TextInput
//         label="Username"
//         value={username}
//         disabled
//         style={{ marginBottom: 10, backgroundColor: '#f5f5f5' }}
//       />
//     </Dialog.Content>
//     <Dialog.Actions>
//       <Button onPress={() => setShowDialog(false)}>Cancel</Button>
//       <Button onPress={handleAddReview}>Submit</Button>
//     </Dialog.Actions>
//   </Dialog>
// </Portal> */}

// <Portal>
//   <Dialog visible={showDialog} onDismiss={() => {
//     setShowDialog(false);
//     setIsEditing(false);
//     setEditingId(null);
//     setNewReview({ movie: '', rating: '', review: '' });
//   }}>
//     <Dialog.Title>{isEditing ? "Edit Review" : "Add New Review"}</Dialog.Title>
//     <Dialog.Content>
//       <TextInput
//         label="Movie"
//         value={newReview.movie}
//         onChangeText={(text) => setNewReview({ ...newReview, movie: text })}
//         style={{ marginBottom: 10 }}
//       />
//       <TextInput
//         label="Rating"
//         value={newReview.rating}
//         onChangeText={(text) => setNewReview({ ...newReview, rating: text })}
//         keyboardType="numeric"
//         style={{ marginBottom: 10 }}
//       />
//       <TextInput
//         label="Review"
//         value={newReview.review}
//         onChangeText={(text) => setNewReview({ ...newReview, review: text })}
//         multiline
//         style={{ marginBottom: 10 }}
//       />
//       <TextInput
//         label="Username"
//         value={username}
//         disabled
//         style={{ marginBottom: 10, backgroundColor: '#f5f5f5' }}
//       />
//     </Dialog.Content>
//     <Dialog.Actions>
//       <Button onPress={() => {
//         setShowDialog(false);
//         setIsEditing(false);
//         setEditingId(null);
//         setNewReview({ movie: '', rating: '', review: '' });
//       }}>Cancel</Button>
//       <Button onPress={isEditing ? handleUpdateReview : handleAddReview}>
//         {isEditing ? "Update" : "Submit"}
//       </Button>
//     </Dialog.Actions>
//   </Dialog>
// </Portal>


//     </Provider>
//   );
// };

// const styles = StyleSheet.create({
//   list: {
//     padding: 10,
//     paddingBottom: 80,
//   },
//   card: {
//     marginBottom: 10,
//     borderRadius: 10,
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//     borderRadius: 25,
//   },
//   input: {
//     marginBottom: 10,
//   },
// });

// export default ReviewListScreen;


import React, { useEffect, useState } from 'react';
import { View, Alert, FlatList, StyleSheet } from 'react-native';
import {
  Card,
  Button,
  Text,
  Title,
  TextInput,
  Dialog,
  Portal,
  Provider,
} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
  } from 'react-native';

const ReviewListScreen = ({ onLogout }) => {
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState('');
  const [newReview, setNewReview] = useState({ movie: '', rating: '', review: '' });

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const navigation = useNavigation();

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await axios.post('http://172.21.47.1/Backend/index.php/user/delete', { id });
              Alert.alert("Delete Response", response.data);
              fetchData();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete review');
            }
          },
        },
      ]
    );
  };

  const handleAddReview = async () => {
    if (!newReview.movie || !newReview.rating || !newReview.review) {
      Alert.alert('Validation', 'All fields are required');
      return;
    }

    try {
      const storedUsername = await AsyncStorage.getItem('username');
      if (!storedUsername) {
        Alert.alert('Error', 'User not logged in');
        return;
      }

      await axios.post('http://172.21.47.1/Backend/index.php/user/writereview', {
        movie: newReview.movie,
        rating: newReview.rating,
        review: newReview.review,
        username: storedUsername,
      });

      setShowAddDialog(false);
      setNewReview({ movie: '', rating: '', review: '' });
      fetchData();
    } catch (error) {
      Alert.alert('Error', 'Failed to add review');
    }
  };

  const handleUpdateReview = async () => {
    if (!newReview.movie || !newReview.rating || !newReview.review) {
      Alert.alert('Validation', 'All fields are required');
      return;
    }

    try {
      await axios.post('http://172.21.47.1/Backend/index.php/user/editreview', {
        id: editingId,
        movie: newReview.movie,
        rating: newReview.rating,
        review: newReview.review,
      });

      Alert.alert('Success', 'Review updated');
      setShowEditDialog(false);
      setEditingId(null);
      setNewReview({ movie: '', rating: '', review: '' });
      fetchData();
    } catch (error) {
      Alert.alert('Error', 'Failed to update review');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('userToken');

      if (typeof onLogout !== 'function') {
        throw new Error('onLogout is not a function');
      }

      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to log out');
    }
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
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('ReviewDetail', { item })}
        >
          View
        </Button>
        {item.username === username && (
          <>
            <Button
              onPress={() => {
                setNewReview({
                  movie: item.movie,
                  rating: item.rating.toString(),
                  review: item.review,
                });
                setEditingId(item.id);
                setShowEditDialog(true);
              }}
            >
              Edit
            </Button>
            <Button onPress={() => handleDelete(item.id)} textColor="red">
              Delete
            </Button>
          </>
        )}
      </Card.Actions>
    </Card>
  );

  return (
    <Provider>
      <Button mode="outlined" onPress={handleLogout} style={{ margin: 10 }}>
        Logout
      </Button>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item?.id?.toString?.() ?? Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <Button
        mode="contained"
        onPress={() => {
          setNewReview({ movie: '', rating: '', review: '' });
          setShowAddDialog(true);
        }}
        style={styles.addButton}
      >
        Add Review
      </Button>

      {/* Add Review Dialog */}
      <Portal>
        <Dialog visible={showAddDialog} onDismiss={() => setShowAddDialog(false)}>
          <Dialog.Title>Add New Review</Dialog.Title>
          <Dialog.Content>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
                <ScrollView>
                    <TextInput
                    label="Movie"
                    value={newReview.movie}
                    onChangeText={(text) => setNewReview({ ...newReview, movie: text })}
                    style={styles.input}
                    />
                    <TextInput
                    label="Rating"
                    keyboardType="numeric"
                    value={newReview.rating}
                    onChangeText={(text) => setNewReview({ ...newReview, rating: text })}
                    style={styles.input}
                    />
                    <TextInput
                    label="Review"
                    multiline
                    value={newReview.review}
                    onChangeText={(text) => setNewReview({ ...newReview, review: text })}
                    style={styles.input}
                    />
                    <TextInput
                    label="Username"
                    value={username}
                    disabled
                    style={{ marginBottom: 10, backgroundColor: '#f5f5f5' }}
                    />
                </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            </Dialog.Content>


          <Dialog.Actions>
            <Button onPress={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onPress={handleAddReview}>Submit</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Edit Review Dialog */}
      <Portal>
        <Dialog visible={showEditDialog} onDismiss={() => setShowEditDialog(false)}>
          <Dialog.Title>Edit Review</Dialog.Title>
          <Dialog.Content>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
                <ScrollView>
                    <TextInput
                    label="Movie"
                    value={newReview.movie}
                    onChangeText={(text) => setNewReview({ ...newReview, movie: text })}
                    style={styles.input}
                    />
                    <TextInput
                    label="Rating"
                    keyboardType="numeric"
                    value={newReview.rating}
                    onChangeText={(text) => setNewReview({ ...newReview, rating: text })}
                    style={styles.input}
                    />
                    <TextInput
                    label="Review"
                    multiline
                    value={newReview.review}
                    onChangeText={(text) => setNewReview({ ...newReview, review: text })}
                    style={styles.input}
                    />
                    <TextInput
                    label="Username"
                    value={username}
                    disabled
                    style={{ marginBottom: 10, backgroundColor: '#f5f5f5' }}
                    />
                </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            </Dialog.Content>


          <Dialog.Actions>
            <Button onPress={() => setShowEditDialog(false)}>Cancel</Button>
            <Button onPress={handleUpdateReview}>Update</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    paddingBottom: 80,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: 25,
  },
  input: {
    marginBottom: 10,
  },
});

export default ReviewListScreen;
