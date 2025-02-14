import { atom } from 'jotai';

import { FormStatus } from '@/components/newsletter/types';

type NewsletterState = {
  email: string;
  status: FormStatus;
  message: string;
};

const initialState: NewsletterState = {
  email: '',
  status: FormStatus.Idle,
  message: '',
};

export const newsletterAtom = atom<NewsletterState>(initialState);

// Derived atoms for individual state pieces
export const emailAtom = atom(
  get => get(newsletterAtom).email,
  (get, set, email: string) => set(newsletterAtom, { ...get(newsletterAtom), email })
);

export const statusAtom = atom(
  get => get(newsletterAtom).status,
  (get, set, status: FormStatus) => set(newsletterAtom, { ...get(newsletterAtom), status })
);

export const messageAtom = atom(
  get => get(newsletterAtom).message,
  (get, set, message: string) => set(newsletterAtom, { ...get(newsletterAtom), message })
);

// Action atoms
export const setLoadingAtom = atom(null, (get, set) =>
  set(newsletterAtom, { ...get(newsletterAtom), status: FormStatus.Loading, message: '' })
);

export const setSuccessAtom = atom(null, (get, set) =>
  set(newsletterAtom, {
    ...get(newsletterAtom),
    status: FormStatus.Success,
    email: '',
    message: '',
  })
);

export const setErrorAtom = atom(null, (get, set, message: string) =>
  set(newsletterAtom, { ...get(newsletterAtom), status: FormStatus.Error, message })
);

export const resetAtom = atom(null, (get, set) =>
  set(newsletterAtom, { ...get(newsletterAtom), status: FormStatus.Idle, message: '' })
);

/* Usage Example:

import { useAtom } from 'jotai';
import {
  emailAtom,
  statusAtom,
  messageAtom,
  setLoadingAtom,
  setSuccessAtom,
  setErrorAtom,
} from './newsletter-form.jotai';

function NewsletterForm() {
  // Use individual atoms for granular updates
  const [email, setEmail] = useAtom(emailAtom);
  const [status] = useAtom(statusAtom);
  const [message] = useAtom(messageAtom);
  
  // Action atoms only need the setter
  const [, setLoading] = useAtom(setLoadingAtom);
  const [, setSuccess] = useAtom(setSuccessAtom);
  const [, setError] = useAtom(setErrorAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading();
    
    try {
      // API call logic...
      await submitNewsletter(email);
      setSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={status === FormStatus.Loading}
      />
      {message && status === FormStatus.Error && (
        <div>{message}</div>
      )}
    </form>
  );
}
*/
