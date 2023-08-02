export interface InputField {
  name: string;
  value: string;
}

export interface ThreeDSEvent {
  data: any;
  name: string;
}

export type CreditCard = {
  data: CreditCardData | undefined;
  token: string | undefined;
};

// Additional fields for Spreedly.tokenizeCreditCard https://docs.spreedly.com/reference/iframe/v1/#tokenization
// Must provide first_name and last_name OR full_name to tokenize
export interface CreditCardData {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  month: number;
  year: number;
  email?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone_number?: string;
  company?: string;
  shipping_address1?: string;
  shipping_address2?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_zip?: string;
  shipping_country?: string;
  shipping_phone_number?: string;
  eligible_for_card_updater?: boolean;
  metadata?: Record<string, number | string>;
}

// Spreedly Payment Method Object https://docs.spreedly.com/reference/api/v1/#show33
export interface SpreedlyPaymentMethod extends CreditCardData {
  token: string;
  created_at: string;
  updated_at: string;
  data: Record<string, any>;
  storage_state: string;
  test: boolean;
  callback_url: any;
  last_four_digits: string;
  first_six_digits: string;
  card_type: string;
  issuer_identification_number: string;
  payment_method_type: string;
  errors: any[];
  fingerprint: string;
  verification_value: string;
  number: string;
}

// TODO:
export interface StripePaymentMethod extends CreditCardData {}

export type PaymentCard = SpreedlyPaymentMethod | StripePaymentMethod;

// State management
export type State = {
  card: PaymentCard;
  error: Error | undefined;
  inputs: InputField[];
  loading: boolean;
  scriptIsLoaded: boolean;
  threeDsEvents: ThreeDSEvent[];
};

export enum ActionTypes {
  RESET = "reset",
}

export type Actions = { type: ActionTypes.RESET };

export {};
