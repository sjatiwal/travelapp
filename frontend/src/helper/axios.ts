import axios from 'axios';
import Config from 'react-native-config';

const __CDN__ = Config.__CDN__;

const backend = axios.create({
  withCredentials: true,
  baseURL: __CDN__,
});

export default backend;
