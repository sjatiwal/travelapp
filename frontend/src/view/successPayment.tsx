import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const SuccessPayment: React.FC = () => {
  const navigation: any = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.message}>Your Payment is completed</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PaidBookingList')}>
          <Text style={styles.text}>View Travel Details</Text>
          <Icon name="arrow-circle-o-right" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    alignItems: 'center',
    marginTop: '50%',
  },
  message: {
    color: 'green',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    justifyContent: 'center',
    width: 250,
    alignItems: 'center',
    backgroundColor: '#1998eb',
    borderRadius: 20,
    paddingVertical: 5,
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default SuccessPayment;
