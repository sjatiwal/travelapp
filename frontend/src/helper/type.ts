// type for booking details
export type BookingDetails = {
  user?: User[] | [];
  tripPackage?: string;
  selectedDate?: string | undefined;
  location?: string;
  noOfPeople?: string;
  cost?: number;
  travel_id?: string;
  action?: string;
};

// To render list in Header
export type ListItemHeaderProps = {
  item: {
    name: string;
    page: string;
    user: boolean;
  };
  navigation: Navigation;
  setShowNavList: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Navigation = {
  navigate: (item: string) => void;
};

// type for user Login, register, profile update, password change
export type LoginUser = {
  loginEmail: string;
  loginPassword: string;
};

export type PasswordType = {
  currentPassword: string;
  changedPassword: string;
};

export type ProfileType = {
  editedName: string;
  editedphoneNo: string;
};

export type RegisterUser = {
  registerName: string;
  registerEmail: string;
  registerPhoneNo: string;
  registerPassword: string;
};

// type for user Suggestion
export type Suggestion = {
  name: string;
  message: string;
  suggestion_id: string;
};

export type TravelDetails = {
  tripPackage: string;
  selectedDate: string;
  location: string;
  noOfPeople: string;
  cost: string;
  action: string;
};
// type for load user
export type User = {
  username: string;
  email: string;
  phoneNo: string;
  user_id: string;
  userrole: string;
};

// type for action of user
export type UserAction = {
  type: string;
  payload: string | User[] | boolean;
};

// type for action of booking
export type BookingAction = {
  type: string;
  payload: string | BookingDetails;
};

export type SuggestionAction = {
  type: string;
  payload: string | Suggestion[];
};

export type DeleteAction = {
  type: string;
  payload: string;
};

// TableProps
type HeaderItem = {
  name: string;
  data: string;
};

export type RowData = {
  username?: string;
  email?: string;
  phoneNo?: string;
  user_id?: string;
  userrole?: string;
  tripPackage?: string;
  selectedDate?: string;
  location?: string;
  noOfPeople?: string;
  cost?: string;
  travel_id?: string;
  action?: string;
  name?: string;
  message?: string;
  suggestion_id?: string;
};

export type TableProps = {
  header: HeaderItem[];
  rows: RowData[];
  deleteHandler: (itemData: RowData[keyof RowData] | undefined) => void;
};

// types for props

export type DataType = {
  place?: string;
  uri?: string;
  texturl?: string;
};

export type ListItemHomeProps = {
  item: {
    place: string;
    uri: string;
    texturl: string;
  };
  index: number;
};

export type TextUrl = {
  texturl?: string;
};

export type IsDeleted = {
  isDeleted?: boolean;
};

export type AmountType = {
  totalAmount: string;
};

export type ProfileState = {
  isUpdated?: boolean;
};

// cardDetails
export type CardDetails = {
  brand: string;
  complete: boolean;
  expiryMonth: number | null;
  expiryYear: number | null;
  last4: string;
  validCVC: string;
  validExpiryDate: string;
  validNumber: string;
};

type BillingDetails = {
  email: string;
  name: string;
};
type PaymentMethodData = {
  payment_method: string;
  card: CardDetails;
  billingDetails: BillingDetails;
};

export type ConfirmPaymentType = {
  paymentMethodType: 'Card';
  paymentMethodData: PaymentMethodData;
};
