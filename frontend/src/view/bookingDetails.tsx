import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import backend from '../helper/axios';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import {format} from 'date-fns';
import {useAppDispatch, useAppSelector} from '../helper/hooks';
import {savebookingDetails} from '../actions/bookingDetailsAction';

const BookingDetails: React.FC = () => {
  const route = useRoute();
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const texturl = route.params;
  const {user, isAuthenticated} = useAppSelector(state => state.user);

  const [name, setname] = useState('Guest');
  const [location, setLocation] = useState('');
  const [amount, setAmount] = useState('');
  const [tripPackage, setTripPackage] = useState('');
  const [noOfPeople, setNoOfPeople] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | undefined>('');
  const [showCalender, setshowCalender] = useState(false);

  const price = parseInt(amount?.toString() || '0', 10);
  const intNoOfPeople = parseInt(noOfPeople?.toString() || '0', 10);
  const totalAmount = price * intNoOfPeople;
  const checkNumber = (text: string) => {
    let numreg = /^[0-9]*$/;

    if (numreg.test(text)) {
      setNoOfPeople(text);
    } else {
      Alert.alert('Please Enter Only Number');
    }
  };
  const fetchData = async () => {
    const {data} = await backend.get(`${texturl}`);
    setLocation(data.place);
    setAmount(data.amount);
    setTripPackage(data.package);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = (date: Date) => {
    // Format the date using date-fns (for example, in the "yyyy-MM-dd" format)
    const formattedDate = format(date, 'yyyy-MM-dd');
    setSelectedDate(formattedDate);
  };

  const getName = () => {
    if (user && isAuthenticated) {
      setname(user[0]['username']);
    } else {
      setname('Guest');
    }
  };
  useEffect(() => {
    getName();
  }, [isAuthenticated]);
  const finalBookingDetails = {
    user,
    location,
    cost: totalAmount,
    tripPackage,
    noOfPeople,
    selectedDate,
  };

  const handlePayment = () => {
    user && isAuthenticated
      ? navigation.navigate('Payment', {totalAmount})
      : navigation.navigate('LoginRegister');

    dispatch(savebookingDetails(finalBookingDetails));
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Booking Details</Text>
      <Text style={styles.text}>
        UserName: <Text style={styles.subtext}>{name}</Text>
      </Text>
      <Text style={styles.text}>
        Choice: <Text style={styles.subtext}>{location}</Text>
      </Text>
      <Text style={styles.text}>
        Package: <Text style={styles.subtext}>{tripPackage}</Text>
      </Text>
      <Text style={styles.text}>
        Amount per Person: <Text style={styles.subtext}>₹{amount}</Text>
      </Text>
      <View style={styles.mainInputContainer}>
        <Text style={styles.text}>People:</Text>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Enter Number of People..."
            value={noOfPeople}
            onChangeText={text => checkNumber(text)}
            style={styles.dataInput}
            keyboardType="numeric"
            maxLength={1}
          />
        </View>
      </View>
      <View style={styles.mainInputContainer}>
        <Text style={styles.text}>Date:</Text>
        <View style={styles.inputBox}>
          <View style={styles.dateBox}>
            <TouchableOpacity onPress={() => setshowCalender(!showCalender)}>
              <TextInput
                editable={false}
                style={styles.dataInput}
                value={selectedDate}
                placeholder="Select starting Date..."
                keyboardType="visible-password"
              />
            </TouchableOpacity>
            <View style={styles.calender}>
              {showCalender && (
                <CalendarPicker
                  startFromMonday={true}
                  allowRangeSelection={false}
                  minDate={new Date()}
                  maxDate={new Date(2025, 1, 1)}
                  todayBackgroundColor="#f2e6ff"
                  selectedDayColor="#7300e6"
                  selectedDayTextColor="#FFFFFF"
                  onDateChange={date => [
                    handleDateChange(date),
                    setshowCalender(false),
                  ]}
                  width={300}
                />
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={[
            styles.bookingbutton,
            {
              backgroundColor:
                totalAmount === 0 || selectedDate === ''
                  ? '#b3b1ad'
                  : '#1998eb',
            },
          ]}
          onPress={handlePayment}
          disabled={totalAmount === 0 || selectedDate === ''}>
          <Text style={styles.bookingbuttontext}>Payment-₹{totalAmount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    padding: 4,
  },
  heading: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
  },
  subtext: {
    fontWeight: '400',
  },
  mainInputContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputBox: {
    justifyContent: 'center',
  },
  dataInput: {
    borderWidth: 2,
    borderColor: 'grey',
    height: 40,
    color: 'black',
    font: 'bold',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  dateBox: {
    position: 'relative',
  },
  calender: {
    position: 'absolute',
    top: 40,
    zIndex: 100,
    backgroundColor: '#FFFFFF',
  },
  buttonBox: {
    alignItems: 'center',
  },
  bookingbutton: {
    justifyContent: 'center',
    width: 250,
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 5,
    marginTop: 10,
  },
  bookingbuttontext: {fontSize: 20, color: '#000000', fontWeight: 'bold'},
});

export default BookingDetails;
