import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {allImages} from '../data/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import {ListItemHomeProps} from '../helper/type';

// for navigation props
import {RootStackParamsList} from '../routes/allScreen';
import {StackNavigationProp} from '@react-navigation/stack';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamsList, 'Home'>;
};

const Home: React.FC<HomeScreenProps> = ({navigation}) => {
  const [listWidth, setListWidth] = useState<number>(0);
  const [clientWidth, setClientWidth] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [listboxWidth, setListboxWidth] = useState<number>(0);

  const rowRef = useRef<FlatList<any> | null>(null);
  const handleFlatListSizeChange = (width: number) => {
    setListWidth(width);
  };

  const getWidth = (event: {nativeEvent: {layout: {width: number}}}) => {
    setClientWidth(Math.ceil(event.nativeEvent.layout.width));
  };
  const getListboxWidth = (event: {nativeEvent: {layout: {width: number}}}) => {
    setListboxWidth(Math.ceil(event.nativeEvent.layout.width));
  };

  const handlePress = (direction: string) => {
    if (rowRef.current) {
      if (scrollLeft <= listWidth - clientWidth && scrollLeft >= 0) {
        const offset =
          direction === 'left'
            ? scrollLeft - clientWidth - 8
            : scrollLeft + clientWidth + 8;
        setScrollLeft(offset);
        rowRef.current.scrollToOffset({
          offset: scrollLeft,
          animated: true,
        });
      } else if (scrollLeft > listWidth - clientWidth) {
        setScrollLeft(listWidth - clientWidth);
      } else if (scrollLeft < 0) {
        setScrollLeft(0);
      }
    }
  };

  useEffect(() => {
    if (rowRef.current) {
      const length =
        listWidth - clientWidth * (Math.floor(listboxWidth / clientWidth) - 1);

      if (clientWidth > 0) {
        const leftScroll = setTimeout(() => {
          const offset = scrollLeft + clientWidth + 8;
          setScrollLeft(offset);
        }, 2000);
        if (scrollLeft >= length) {
          setScrollLeft(0);
        }
        rowRef.current.scrollToOffset({
          offset: scrollLeft,
          animated: true,
        });
        return () => clearTimeout(leftScroll);
      }
    }
  }, [scrollLeft, clientWidth]);

  function ListItem({item, index}: ListItemHomeProps): JSX.Element {
    const marginRight = index < allImages.length - 1 ? 8 : 0;
    return (
      <View style={[styles.imgbox, {marginRight}]} onLayout={getWidth}>
        <Image source={{uri: item.uri}} style={styles.image} />
        <Text style={styles.imgboxtext}>{item.place}</Text>
        <TouchableOpacity
          style={styles.imgboxbutton}
          onPress={() => navigation.navigate('LocationPage', item)}>
          <Text style={styles.imgboxbuttontext}>Visit Page</Text>
          <Icon name="arrow-circle-o-right" size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Video
        source={require('../videos/maldives.mp4')}
        controls={false}
        repeat={true}
        style={styles.video}
        muted={true}
        paused={false}
      />
      <View style={styles.mainimgbox}>
        <Icon
          name="angle-left"
          size={40}
          color="#000000"
          onPress={() => handlePress('left')}
        />

        <View style={styles.listbox} onLayout={getListboxWidth}>
          <FlatList
            data={allImages}
            ref={rowRef}
            renderItem={ListItem}
            keyExtractor={item => item.place}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onContentSizeChange={contentWidth =>
              handleFlatListSizeChange(contentWidth)
            }
          />
        </View>
        <Icon
          name="angle-right"
          size={40}
          color="#000000"
          onPress={() => handlePress('right')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    zIndex: 0,
  },
  video: {
    position: 'relative',
    width: '100%',
    zIndex: 0,
    aspectRatio: 16 / 9,
  },
  mainimgbox: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  listbox: {
    display: 'flex',
    overflow: 'hidden',
    width: 250,
    marginHorizontal: 4,
    border: 'none',
  },
  imgbox: {
    position: 'relative',
    width: 250,
    aspectRatio: 4 / 3,
    border: 'none',
    overflow: 'hidden',
  },
  imgboxtext: {
    position: 'absolute',
    marginTop: 20,
    marginLeft: 5,
    color: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 20,
    paddingHorizontal: 10,
    padding: 5,
    fontSize: 20,
  },
  imgboxbutton: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 10,
    backgroundColor: '#1998eb',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  imgboxbuttontext: {
    color: '#FFFFFF',
    fontSize: 15,
    marginRight: 7,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
});

export default Home;
