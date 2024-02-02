import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import backend from '../helper/axios';

const ContactUs: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const messageSent = async (name: string, message: string) => {
    try {
      const response = await backend.post('/api/v1/messageSent', {
        name,
        message,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = () => {
    if (name !== '' && message !== '') {
      messageSent(name, message);
      setName(''), setMessage('');
    } else {
      Alert.alert(`Please fill the name and suggestion`);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Contact Us</Text>
      <Text style={styles.content}>
        We value your feedback and are always eager to hear from our users. If
        you have any questions, suggestions, or just want to say hello, please
        don't hesitate to contact us.
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.text}
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Enter your name..."
        />
        <TextInput
          style={styles.text}
          value={message}
          onChangeText={text => setMessage(text)}
          placeholder="Enter your Suggestions..."
          multiline={true}
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.content}>
        Thank you for choosing TravelApp as your travel companion. We look
        forward to being a part of your journey!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 4,
  },
  heading: {
    marginTop: 10,
    fontSize: 30,
    color: '#000000',
    fontWeight: '700',
  },
  content: {
    fontSize: 17,
    color: '#000000',
    marginTop: 8,
    fontWeight: '300',
  },
  form: {
    backgroundColor: '#a9cfcb',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 50,
    paddingVertical: 30,
  },
  text: {
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 22,
    backgroundColor: 'white',
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
export default ContactUs;
