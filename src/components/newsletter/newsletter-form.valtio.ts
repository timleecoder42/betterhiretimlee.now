import { proxy } from 'valtio';

import { FormStatus } from '@/components/newsletter/types';

interface NewsletterState {
  email: string;
  status: FormStatus;
  message: string;
}

export const newsletterState = proxy<NewsletterState>({
  email: '',
  status: FormStatus.Idle,
  message: '',
});

// Actions
export const newsletterActions = {
  setEmail: (email: string) => {
    newsletterState.email = email;
  },
  setLoading: () => {
    newsletterState.status = FormStatus.Loading;
    newsletterState.message = '';
  },
  setSuccess: () => {
    newsletterState.status = FormStatus.Success;
    newsletterState.email = '';
    newsletterState.message = '';
  },
  setError: (message: string) => {
    newsletterState.status = FormStatus.Error;
    newsletterState.message = message;
  },
  reset: () => {
    newsletterState.status = FormStatus.Idle;
    newsletterState.message = '';
  },
};

/* Usage Example:

import { useSnapshot } from 'valtio';
import { newsletterState, newsletterActions } from './newsletter-form.valtio';

function NewsletterForm() {
  // Get a reactive snapshot of the state
  const state = useSnapshot(newsletterState);

  // Actions can be used directly
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    newsletterActions.setLoading();
    
    try {
      // API call logic...
      await submitNewsletter(state.email);
      newsletterActions.setSuccess();
    } catch (error) {
      newsletterActions.setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={state.email}
        onChange={e => newsletterActions.setEmail(e.target.value)}
        disabled={state.status === FormStatus.Loading}
      />
      {state.message && state.status === FormStatus.Error && (
        <div>{state.message}</div>
      )}
    </form>
  );
}

// Note: Valtio also supports direct state mutations in non-React contexts
// Example:
// newsletterState.email = 'example@email.com';
// But always use actions for better maintainability
*/
