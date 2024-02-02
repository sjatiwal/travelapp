import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import backend from '../helper/axios';
import React, {useEffect, useState} from 'react';

const LocationPage: React.FC = () => {
  const route = useRoute();
  const navigation: any = useNavigation();
  const [details, setDetails] = useState('');

  const {place, uri, texturl}: any = route.params;

  const fetchDetails = async () => {
    const response = await backend.get(`${texturl}`);
    setDetails(response.data.text);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Place:{place}</Text>
      <Image source={{uri: uri}} style={styles.image} />
      <Text style={styles.text}>{details}</Text>
      <TouchableOpacity
        style={styles.bookingbutton}
        onPress={() => navigation.navigate('BookingDetails', texturl)}>
        <Text style={styles.bookingbuttontext}>Book Your Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 4,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 10,
  },
  bookingbutton: {
    justifyContent: 'center',
    width: 250,
    alignItems: 'center',
    backgroundColor: '#1998eb',
    borderRadius: 20,
    paddingVertical: 5,
    marginTop: 10,
  },
  bookingbuttontext: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  image: {
    width: 250,
    aspectRatio: '4 / 3',
    zIndex: 10,
    borderRadius: 12,
  },
  text: {
    color: 'black',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
});

export default LocationPage;
