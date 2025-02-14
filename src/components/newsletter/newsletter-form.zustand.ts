import { create } from 'zustand';

import { FormStatus } from '@/components/newsletter/types';

type NewsletterState = {
  email: string;
  status: FormStatus;
  message: string;
  setEmail: (email: string) => void;
  setLoading: () => void;
  setSuccess: () => void;
  setError: (message: string) => void;
  reset: () => void;
};

export const useNewsletterStore = create<NewsletterState>(set => ({
  email: '',
  status: FormStatus.Idle,
  message: '',
  setEmail: email => set({ email }),
  setLoading: () => set({ status: FormStatus.Loading, message: '' }),
  setSuccess: () => set({ status: FormStatus.Success, email: '', message: '' }),
  setError: message => set({ status: FormStatus.Error, message }),
  reset: () => set({ status: FormStatus.Idle, message: '' }),
}));

/* Usage Example:

import { useNewsletterStore } from './newsletter-form.zustand';

function NewsletterForm() {
  // Get state and actions from the store
  const {
    email,
    status,
    message,
    setEmail,
    setLoading,
    setSuccess,
    setError,
  } = useNewsletterStore();

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
