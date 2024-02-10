import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import AllScreen from './src/routes/allScreen';
import backend from './src/helper/axios';
import BottomNavigation from './src/routes/bottomnavigation';
import Header from './src/components/header';
import {StripeProvider} from '@stripe/stripe-react-native';
import {loadUser} from './src/actions/userAction';
import {AppProvider} from './src/routes/appContext';

// Store
import {Provider} from 'react-redux';
import store from './src/store/store';

//navigation
import {NavigationContainer} from '@react-navigation/native';

// const Stack = createNativeStackNavigator();

// Get the screen dimensions
const {height: screenHeight} = Dimensions.get('window');

const App: React.FC = () => {
  const [stripe_key, setStripe_key] = useState<string>('');

  // stripe api key
  const getStripeApiKey = async () => {
    const {data} = await backend.get('/api/v1/stripeapikey');
    setStripe_key(data.stripeApiKey);
  };

  useEffect(() => {
    getStripeApiKey();
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <StripeProvider
        publishableKey={stripe_key}
        merchantIdentifier="merchant.com.travelapp">
        <AppProvider>
          <SafeAreaView style={styles.mainContainer}>
            <NavigationContainer>
              <Header />
              <AllScreen />
              <BottomNavigation />
            </NavigationContainer>
          </SafeAreaView>
        </AppProvider>
      </StripeProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {zIndex: 0, position: 'relative', height: screenHeight - 30},
});

export default App;
