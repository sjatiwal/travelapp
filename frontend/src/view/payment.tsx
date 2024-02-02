import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useState, useRef} from 'react';
import backend from '../helper/axios';
import {useRoute} from '@react-navigation/native';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import {useAppDispatch, useAppSelector} from '../helper/hooks';
import {confirmTravelDetails} from '../actions/bookingDetailsAction';
import {useNavigation} from '@react-navigation/native';

const Payment: React.FC = () => {
  const {confirmPayment} = useStripe();
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const paymentUseRef = useRef<TouchableOpacity>(null);
  const {user, location, noOfPeople, selectedDate, cost, tripPackage} =
    useAppSelector(state => state.bookingInfo.bookinginfo);

  const [cardInfo, setCardInfo] = useState(null);
  const [paymentDisabled, setPaymentDisabled] = useState(true);
  const route = useRoute();
  const {totalAmount}: any = route.params;

  const fetchCardDetails = (cardDetails: any) => {
    if (cardDetails.complete) {
      setCardInfo(cardDetails);
      setPaymentDisabled(false);
    } else {
      setCardInfo(null);
      setPaymentDisabled(true);
    }
  };

  const price = parseInt(totalAmount?.toString() || '0', 10);

  const totalCost = price * 100;

  const processPayment = async (e: any) => {
    e.preventDefault();
    setPaymentDisabled(true);

    const {data} = await backend.post(
      `api/v1/payment/process`,
      {amount: totalCost, user},
      {
        headers: {
          'content-type': 'application/json',
        },

        withCredentials: true,
      },
    );
    const client_secret = data.client_secret;

    if (client_secret) {
      const result = await confirmPayment(client_secret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          payment_method: 'card',
          card: cardInfo,
          billingDetails: {
            email: user[0].email,
            name: user[0].username,
          },
        },
      } as any);

      const {paymentIntent, error} = result;
      if (error) {
        Alert.alert('Payment Failed');
        console.log('Payment confirmation error', error);
        setPaymentDisabled(false);
      } else if (paymentIntent) {
        console.log('Success from promise', paymentIntent);
        const paymentStatus: string = paymentIntent.status;
        if (paymentStatus === 'Succeeded') {
          const traveldetalis = {
            location,
            noOfPeople,
            selectedDate,
            cost,
            tripPackage,
          };
          dispatch(confirmTravelDetails(traveldetalis));
          navigation.navigate('SuccessPayment');
        } else {
          Alert.alert('Payment is not completed due to some reason');
        }
      }
    }
  };

  return (
    <>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Payment</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.form}>
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={cardDetails => {
              fetchCardDetails(cardDetails);
            }}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />

          <TouchableOpacity
            ref={paymentUseRef}
            style={[
              styles.payment,
              {
                backgroundColor: paymentDisabled ? '#CCCCCC' : '#3d89f4',
              },
            ]}
            onPress={processPayment}
            disabled={paymentDisabled}>
            <Text style={styles.text}>Pay-₹{`${price}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  container: {
    alignItems: 'center',
  },
  form: {
    width: 300,
    backgroundColor: '#B8860B',
    alignItems: 'center',
    marginTop: 50,
    paddingVertical: 50,
    borderRadius: 20,
  },
  payment: {
    // backgroundColor: '#3d89f4',
    width: 250,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
  },
  text: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '600',
  },
});

export default Payment;
