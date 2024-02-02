export const bookingDetailsReducer = (
  state = {bookinginfo: {}},
  action: any,
) => {
  switch (action.type) {
    case 'SAVE_BOKING_DETAILS':
      return {
        ...state,
        bookinginfo: action.payload,
      };
    default:
      return state;
  }
};
