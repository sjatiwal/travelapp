import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {logoutUser} from '../actions/userAction';
import {useAppContext} from '../routes/appContext';
import {useAppDispatch} from '../helper/hooks';
import {ListItemHeaderProps, Navigation} from '../helper/type';

function ListItem({
  item,
  navigation,
  setShowNavList,
}: ListItemHeaderProps): JSX.Element {
  return (
    <>
      {item.user && (
        <TouchableOpacity
          style={styles.navLink}
          onPress={() => [
            navigation.navigate(item.page),
            setShowNavList(false),
          ]}>
          <Text style={styles.navLinkText}>{item.name}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const Header: React.FC = () => {
  const {user, isAuthenticated} = useAppContext();
  const [showNavList, setShowNavList] = useState<boolean>(false);
  const navigation: Navigation = useNavigation();
  const dispatch = useAppDispatch();
  const navListdata = [
    {
      name: 'About Us',
      page: 'AboutUs',
      user: true,
    },
    {
      name: 'Contact Us',
      page: 'ContactUs',
      user: isAuthenticated,
    },
    {
      name: 'Login & Register',
      page: 'LoginRegister',
      user: !isAuthenticated,
    },
  ];
  const handleLogout = () => {
    dispatch(logoutUser());
    setShowNavList(false);
    navigation.navigate('Home');
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../images/logo.jpg')} style={styles.logo} />
          <Text style={styles.name}>TRAVEL APP</Text>
        </View>
        <View>
          {!showNavList ? (
            <Icon
              name="navicon"
              size={25}
              color="#000000"
              onPress={() => setShowNavList(true)}
            />
          ) : (
            <Icon
              name="remove"
              size={25}
              color="#000000"
              onPress={() => setShowNavList(false)}
            />
          )}
        </View>
      </View>
      {showNavList ? (
        <SafeAreaView style={styles.navList}>
          <FlatList
            data={navListdata}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <ListItem
                item={item}
                navigation={navigation}
                setShowNavList={setShowNavList}
              />
            )}
          />
          {user && isAuthenticated && (
            <TouchableOpacity style={styles.navLink} onPress={handleLogout}>
              <Text style={styles.navLinkText}>Logout</Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    height: 35,
    zIndex: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 4,
  },
  name: {
    color: '#000000',
    fontWeight: '800',
  },
  navList: {
    position: 'absolute',
    top: 35,
    width: '100%',
    zIndex: 100,
    backgroundColor: '#151D1C',
  },
  navLink: {
    borderBottomWidth: 1,
    borderBottomColor: '#B6B3C4',
    paddingVertical: 6,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navLinkText: {
    color: '#B6B3C4',
    fontSize: 23,
  },
});

export default Header;
