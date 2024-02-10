import {useAppContext} from './appContext';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

type Navigation = {
  navigate: (item: string) => void;
};

const BottomNavigation: React.FC = () => {
  const {user, isAuthenticated} = useAppContext();
  const navigation: Navigation = useNavigation();

  return (
    <>
      <View style={styles.mainContainer}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="home" size={30} color="#000000" />
          </TouchableOpacity>
        </View>
        {user && isAuthenticated && (
          <>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('PaidBookingList')}>
                <Icon name="list-alt" size={30} color="#000000" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Icon name="user-circle-o" size={28} color="#000000" />
              </TouchableOpacity>
            </View>
            {user && user[0]['userrole'] === 'admin' && (
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('Admin')}>
                  <Icon name="universal-access" size={28} color="#000000" />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    justifyContent: 'space-around',
  },
});

export default BottomNavigation;
