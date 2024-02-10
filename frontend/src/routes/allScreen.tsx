import Admin from '../view/admin';
import Home from '../view/home';
import AboutUs from '../view/aboutus';
import ContactUs from '../view/contactus';
import LoginRegister from '../view/loginregister';
import LocationPage from '../view/locationPage';
import BookingDetails from '../view/bookingDetails';
import Payment from '../view/payment';
import PaidBookingList from '../view/paidBookingList';
import Profile from '../view/profile';
import SuccessPayment from '../view/successPayment';
import {useAppContext} from './appContext';
import {createStackNavigator} from '@react-navigation/stack';

export type RootStackParamsList = {
  Admin: undefined;
  AboutUs: undefined;
  BookingDetails: {texturl?: string};
  ContactUs: undefined;
  Home: undefined;
  LocationPage: {
    place: string;
    uri: string;
    texturl: string;
  };
  LoginRegister: undefined;
  PaidBookingList: undefined;
  Payment: {totalAmount: number};
  Profile: undefined;
  SuccessPayment: undefined;
};
const Stack = createStackNavigator<RootStackParamsList>();

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
            <Stack.Screen
              name="Profile"
              options={{headerShown: false}}
              component={Profile}
            />
            {
              <Stack.Screen
                name="Admin"
                options={{headerShown: false}}
                component={Admin}
              />
            }
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
