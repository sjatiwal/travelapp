import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import AllScreen from './src/routes/allScreen';
// import AboutUs from './src/view/aboutus';
// import BookingList from './src/view/bookinglist';
// import ContactUs from './src/view/contactus';
// import Home from './src/view/home';
import Header from './src/components/header';
// import LoginRegister from './src/view/loginregister';
// import LocationPage from './src/view/locationPage';
// import Payment from './src/view/payment';
import {StripeProvider} from '@stripe/stripe-react-native';
import {AppProvider} from './src/routes/appContext';

//navigation
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();
const STRIPE_KEY =
  'pk_test_51Od9nXSIGm2MsJthrImPhA289RSr8SRFr4JSvyLRZNS0HpPZiGvhDA6cRTlobqZe1ULQcIK4dAKxx1cqlrp72XVX002RnX7HSY';

// Store
import {Provider} from 'react-redux';
import store from './src/store/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey={STRIPE_KEY}
        merchantIdentifier="merchant.com.travelapp">
        <AppProvider>
          <SafeAreaView style={styles.mainContainer}>
            <NavigationContainer>
              <Header />
              <AllScreen />
              {/* <Stack.Navigator>
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
                name="ContactUs"
                options={{headerShown: false}}
                component={ContactUs}
              />
              <Stack.Screen
                name="LoginRegister"
                options={{headerShown: false}}
                component={LoginRegister}
              />
              <Stack.Screen
                name="LocationPage"
                options={{headerShown: false}}
                component={LocationPage}
              />
              <Stack.Screen
                name="BookingList"
                options={{headerShown: false}}
                component={BookingList}
              />
              <Stack.Screen
                name="Payment"
                options={{headerShown: false}}
                component={Payment}
              />
            </Stack.Navigator> */}
            </NavigationContainer>
          </SafeAreaView>
        </AppProvider>
      </StripeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({mainContainer: {flex: 1, zIndex: 0}});

export default App;
