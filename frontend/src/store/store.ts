import {Middleware} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';

import {userReducer} from '../reducers/userReducer';
import {bookingDetailsReducer} from '../reducers/bookingDetailsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  bookingInfo: bookingDetailsReducer,
});

const middleWare: Middleware[] = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleWare),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
