import {Text, View, StyleSheet} from 'react-native';

const AboutUs: React.FC = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>About TravelApp</Text>
      <Text style={styles.content}>
        Welcome to TravelApp – Your Ultimate Travel Companion!
      </Text>
      <Text style={styles.heading}>Our Story</Text>
      <Text style={styles.content}>
        TravelApp was founded in 2000 by a group of passionate travelers who
        shared a common goal: to make exploring the world easier, more
        enjoyable, and accessible to everyone. Over the years, we have grown
        into a global community of travelers who are united by our love for
        adventure and discovery.
      </Text>
      <Text style={styles.heading}>Our Mission</Text>
      <Text style={styles.content}>
        At TravelApp, our mission is to inspire and empower travelers like you
        to embark on incredible journeys, discover new cultures, and create
        unforgettable memories. We believe that travel has the power to
        transform lives, broaden horizons, and connect people from all walks of
        life.
      </Text>
      <Text style={styles.heading}>What We Offer</Text>
      <Text style={styles.content}>
        Comprehensive Travel Information, User-Friendly Interface, Community and
        Reviews,24/7 Support.
      </Text>
      <Text style={styles.heading}>Meet Our Team</Text>
      <Text style={styles.content}>Mr. X, Mr. Y, Ms. Z</Text>
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
});
export default AboutUs;
