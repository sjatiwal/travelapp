import Config from 'react-native-config';

const __CDN__ = Config.__CDN__;

export const allImages = [
  {
    place: 'Beach',
    uri: `${__CDN__}/images/beach.jpg`,
    texturl: `${__CDN__}/description/beach.json`,
  },
  {
    place: 'City',
    uri: `${__CDN__}/images/city.jpg`,
    texturl: `${__CDN__}/description/city.json`,
  },
  {
    place: 'Desert',
    uri: `${__CDN__}/images/desert.jpg`,
    texturl: `${__CDN__}/description/desert.json`,
  },
  {
    place: 'Field',
    uri: `${__CDN__}/images/field.jpg`,
    texturl: `${__CDN__}/description/field.json`,
  },
  {
    place: 'Forest',
    uri: `${__CDN__}/images/forest.jpg`,
    texturl: `${__CDN__}/description/forest.json`,
  },
  {
    place: 'Long Ride',
    uri: `${__CDN__}/images/longride.jpg`,
    texturl: `${__CDN__}/description/longride.json`,
  },
  {
    place: 'Mountains',
    uri: `${__CDN__}/images/mountains.jpg`,
    texturl: `${__CDN__}/description/mountains.json`,
  },
  {
    place: 'Night Safari',
    uri: `${__CDN__}/images/nightvisit.jpg`,
    texturl: `${__CDN__}/description/nightvisit.json`,
  },
  {
    place: 'Paris',
    uri: `${__CDN__}/images/paris.jpg`,
    texturl: `${__CDN__}/description/paris.json`,
  },
  {
    place: 'Sun Rise',
    uri: `${__CDN__}/images/sunriseinhills.jpg`,
    texturl: `${__CDN__}/description/sunriseinhills.json`,
  },
];
