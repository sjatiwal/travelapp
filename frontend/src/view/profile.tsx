import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useEffect, useState} from 'react';
import {
  CHANGE_PASSWORD_RESET,
  UPDATE_PROFILE_RESET,
} from '../constants/userConstant';
import {
  updateProfileAction,
  updatePasswordAction,
  loadUser,
} from '../actions/userAction';
import {useAppDispatch, useAppSelector} from '../helper/hooks';
import {ProfileState} from '../helper/type';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.user);
  const {isUpdated}: ProfileState = useAppSelector(state => state.profile);

  const username = user[0]?.['username'];
  const userPhoneNo = user[0]?.['phoneNo'];

  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [editPassword, setEditPassword] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(username);
  const [editedphoneNo, setEditedPhoneNo] = useState<string>(userPhoneNo);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [changedPassword, setChangedPassword] = useState<string>('');

  const checkNumber = (text: string) => {
    let numreg = /^[0-9]*$/;

    if (numreg.test(text)) {
      setEditedPhoneNo(text);
    } else {
      Alert.alert('Please Enter Only Number');
    }
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
      dispatch({
        type: CHANGE_PASSWORD_RESET,
      });
      dispatch(loadUser());
    }
  }, [isUpdated]);

  const handleEditProfile = () => {
    dispatch(updateProfileAction({editedName, editedphoneNo}));
  };
  const handleChangePassword = () => {
    dispatch(updatePasswordAction({currentPassword, changedPassword}));
    setCurrentPassword('');
    setChangedPassword('');
  };
  return (
    <>
      <View style={styles.headingcontainer}>
        <Text style={styles.heading}>Profile</Text>
      </View>
      <View style={styles.userDetailsContainerBox}>
        <View style={styles.userDataContainer}>
          <Text style={styles.userData}>Name: </Text>
          <Text style={styles.userInfo}> {user[0]?.['username']}</Text>
        </View>
        <View style={styles.userDataContainer}>
          <Text style={styles.userData}>Eamil: </Text>
          <Text style={styles.userInfo}>{user[0]?.['email']}</Text>
        </View>
        <View style={styles.userDataContainer}>
          <Text style={styles.userData}>PhoneNo: </Text>
          <Text style={styles.userInfo}> {user[0]?.['phoneNo']}</Text>
        </View>
        <View style={styles.userDataContainer}>
          <Text style={styles.userData}>User Role: </Text>
          <Text style={styles.userInfo}> {user[0]?.['userrole']}</Text>
        </View>
      </View>
      <View>
        <View style={styles.editPasswordButtonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              [setEditProfile(false), setEditPassword(!editPassword)];
            }}>
            <Text style={styles.editText}>Edit Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.editProfileContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              [setEditProfile(!editProfile), setEditPassword(false)];
            }}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        {editPassword && (
          <View style={styles.form}>
            <View style={styles.editableDataContainer}>
              {/* <Text style={styles.userData}>CurrentPassword: </Text> */}
              <TextInput
                style={styles.inputBox}
                value={currentPassword}
                onChangeText={text => setCurrentPassword(text)}
                placeholder="Enter current pasword..."
                secureTextEntry={true}
              />
            </View>
            <View style={styles.editableDataContainer}>
              {/* <Text style={styles.userData}>NewPassword: </Text> */}
              <TextInput
                style={styles.inputBox}
                value={changedPassword}
                onChangeText={text => setChangedPassword(text)}
                placeholder="Enter password to be change..."
              />
            </View>
            <View style={styles.submitButtonBox}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleChangePassword}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {editProfile && (
          <View style={styles.form}>
            <View style={styles.editableDataContainer}>
              <TextInput
                style={styles.inputBox}
                value={editedName}
                onChangeText={text => setEditedName(text)}
                placeholder="Enter name to be change..."
              />
            </View>
            <View style={styles.editableDataContainer}>
              <TextInput
                style={styles.inputBox}
                value={editedphoneNo}
                onChangeText={text => checkNumber(text)}
                placeholder="Enter phoneNo to be change..."
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
            <View style={styles.submitButtonBox}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleEditProfile}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headingcontainer: {
    backgroundColor: '#eb7734',
  },
  heading: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 28,
    paddingVertical: 10,
  },
  userDetailsContainerBox: {
    marginTop: 30,
    paddingHorizontal: 5,
  },
  userDataContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'baseline',
  },
  userData: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '500',
  },
  userInfo: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '400',
  },
  editPasswordButtonContainer: {position: 'absolute', marginTop: 30, left: 5},
  editProfileContainer: {
    position: 'absolute',
    right: 5,
    marginTop: 30,
  },
  editButton: {
    backgroundColor: '#eb7734',
    width: 120,
    borderRadius: 10,
    paddingVertical: 3,
  },
  editText: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: '500',
  },
  form: {
    marginTop: 100,
    position: 'relative',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  editableDataContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  inputBox: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    width: 200,
  },
  submitButtonBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 30,
  },
  submitButton: {
    backgroundColor: '#eb7734',
    borderRadius: 10,
    width: 100,
  },
  submitText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 3,
  },
});
export default ProfilePage;
