import { FormStatus } from '@/components/newsletter/types';

type NewsletterFormState = {
  email: string;
  status: FormStatus;
  message: string;
};

type NewsletterFormAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_LOADING' }
  | { type: 'SET_SUCCESS' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET' };

export const initialState: NewsletterFormState = {
  email: '',
  status: FormStatus.Idle,
  message: '',
};

export function newsletterFormReducer(
  state: NewsletterFormState,
  action: NewsletterFormAction
): NewsletterFormState {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        status: FormStatus.Loading,
        message: '',
      };
    case 'SET_SUCCESS':
      return {
        ...state,
        status: FormStatus.Success,
        email: '',
        message: '',
      };
    case 'SET_ERROR':
      return {
        ...state,
        status: FormStatus.Error,
        message: action.payload,
      };
    case 'RESET':
      return {
        ...state,
        status: FormStatus.Idle,
        message: '',
      };
    default:
      return state;
  }
}
