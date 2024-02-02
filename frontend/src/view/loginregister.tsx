import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {loginUser, registerUser} from '../actions/userAction';

import {useAppDispatch} from '../helper/hooks';

const LoginRegister: React.FC = () => {
  const [form, setForm] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [registerName, setRegisterName] = useState<string>('');
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerPhoneNo, setRegisterPhoneNo] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');

  const loginText = form
    ? styles.activeHeadingText
    : styles.inactiveHeadingText;
  const registerText = !form
    ? styles.activeHeadingText
    : styles.inactiveHeadingText;

  const dispatch = useAppDispatch();

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (loginEmail !== '' && loginPassword !== '') {
      dispatch(loginUser(loginEmail, loginPassword));

      setLoginEmail('');
      setLoginPassword('');
    } else {
      Alert.alert('Please Enter Email and Password');
    }
  };

  const checkNumber = (text: string) => {
    let numreg = /^[0-9]*$/;

    if (numreg.test(text)) {
      setRegisterPhoneNo(text);
    } else {
      Alert.alert('Please Enter Only Number');
    }
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    if (
      registerName !== '' &&
      registerEmail !== '' &&
      registerPassword !== '' &&
      registerPhoneNo !== ''
    ) {
      dispatch(
        registerUser(
          registerName,
          registerEmail,
          registerPhoneNo,
          registerPassword,
        ),
      );
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterPhoneNo('');
    } else {
      Alert.alert('Please Fill all the details.');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.formContainer}>
        <View style={styles.heading}>
          <TouchableOpacity onPress={() => setForm(true)}>
            <Text style={loginText}>Login Form</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setForm(false)}>
            <Text style={registerText}>Register Form</Text>
          </TouchableOpacity>
        </View>
        {form && (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={loginEmail}
              onChangeText={text => setLoginEmail(text)}
              placeholder="Enter Your Email..."
            />
            <TextInput
              style={styles.input}
              value={loginPassword}
              onChangeText={text => setLoginPassword(text)}
              placeholder="Enter Your Password..."
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
              <Text style={styles.submitText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
        {!form && (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={registerName}
              onChangeText={text => setRegisterName(text)}
              placeholder="Enter Your Name..."
            />
            <TextInput
              style={styles.input}
              value={registerEmail}
              onChangeText={text => setRegisterEmail(text)}
              placeholder="Enter Your Email..."
            />
            <TextInput
              style={styles.input}
              value={registerPhoneNo}
              onChangeText={text => checkNumber(text)}
              placeholder="Enter Your PhoneNo..."
              keyboardType="numeric"
              maxLength={10}
            />
            <TextInput
              value={registerPassword}
              onChangeText={text => setRegisterPassword(text)}
              style={styles.input}
              placeholder="Enter Your Password..."
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleRegister}>
              <Text style={styles.submitText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 4,
  },
  formContainer: {
    marginTop: 100,
    backgroundColor: '#d1cf28',
    paddingVertical: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  form: {
    marginTop: 20,
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  activeHeadingText: {
    fontSize: 20,
    color: '#08821a',
    fontWeight: '700',
    borderBottomWidth: 2,
    borderBottomColor: '#08821a',
  },
  inactiveHeadingText: {
    fontSize: 20,
    color: '#eb0909',
    fontWeight: '700',
  },
  input: {
    borderWidth: 2,
    borderColor: '#000000',
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#000000',
    fontSize: 22,
    backgroundColor: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#3d89f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    height: 40,
    borderRadius: 20,
  },
  submitText: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '600',
  },
});
export default LoginRegister;
