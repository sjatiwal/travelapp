import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {useEffect, useState} from 'react';
import backend from '../helper/axios';
import Table from '../components/table';

type TripDetails = {
  tripPackage: string;
  selectedDate: string;
  location: string;
  noOfPeople: string;
  cost: string;
};

const PaidBookingDetails: React.FC = () => {
  const [paymentDetails, setPaymentDetails] = useState<TripDetails[]>([]);

  const getPaymentDetails = async () => {
    const {data} = await backend.get('/api/v1/paymentDetails');
    console.log(data, 'PD');
    setPaymentDetails(data.travelDetails);
  };
  useEffect(() => {
    getPaymentDetails();
  }, []);
  console.log(paymentDetails);

  const header = [
    {
      name: 'TripPackage',
      data: 'tripPackage',
    },
    {
      name: 'Date',
      data: 'selectedDate',
    },
    {
      name: 'Location',
      data: 'location',
    },
    {
      name: 'People',
      data: 'noOfPeople',
    },
    {
      name: 'Amount',
      data: 'cost',
    },
  ];

  const rows: TripDetails[] = [];

  paymentDetails &&
    paymentDetails.forEach(item => {
      rows.push({
        tripPackage: item.tripPackage,
        selectedDate: item.selectedDate,
        location: item.location,
        noOfPeople: item.noOfPeople,
        cost: item.cost,
      });
    });

  return (
    <>
      <View style={styles.heading}>
        <Text style={styles.headingText}>BookingList</Text>
      </View>
      <Table header={header} rows={rows} />
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#5d88f2',
  },
  headingText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PaidBookingDetails;
