import Home from '../view/home';
import AboutUs from '../view/aboutus';
import ContactUs from '../view/contactus';
import LoginRegister from '../view/loginregister';
import LocationPage from '../view/locationPage';
import BookingDetails from '../view/bookingDetails';
import Payment from '../view/payment';
import PaidBookingList from '../view/paidBookingList';
import SuccessPayment from '../view/successPayment';
import {useAppContext} from './appContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function AllScreen(): JSX.Element {
  const {user, isAuthenticated} = useAppContext();

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
        <Stack.Screen
          name="AboutUs"
          options={{headerShown: false}}
          component={AboutUs}
        />
        <Stack.Screen
          name="LocationPage"
          options={{headerShown: false}}
          component={LocationPage}
        />
        <Stack.Screen
          name="BookingDetails"
          options={{headerShown: false}}
          component={BookingDetails}
        />
        {user && isAuthenticated ? (
          <>
            <Stack.Screen
              name="ContactUs"
              options={{headerShown: false}}
              component={ContactUs}
            />
            <Stack.Screen
              name="Payment"
              options={{headerShown: false}}
              component={Payment}
            />
            <Stack.Screen
              name="SuccessPayment"
              options={{headerShown: false}}
              component={SuccessPayment}
            />
            <Stack.Screen
              name="PaidBookingList"
              options={{headerShown: false}}
              component={PaidBookingList}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="LoginRegister"
              options={{headerShown: false}}
              component={LoginRegister}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
export default AllScreen;
