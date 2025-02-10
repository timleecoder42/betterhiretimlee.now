import { z } from 'zod';

// Error codes that can be used for i18n
export const NEWSLETTER_ERROR_CODES = {
  INVALID_EMAIL: 'INVALID_EMAIL',
  ALREADY_SUBSCRIBED: 'ALREADY_SUBSCRIBED',
  RATE_LIMITED: 'RATE_LIMITED',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type NewsletterErrorCode =
  (typeof NEWSLETTER_ERROR_CODES)[keyof typeof NEWSLETTER_ERROR_CODES];

export type NewsletterError = {
  code: NewsletterErrorCode;
  message: string;
};

export const newsletterSchema = z.object({
  email: z.string().email({ message: NEWSLETTER_ERROR_CODES.INVALID_EMAIL }),
  locale: z.string().min(2).max(10),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Map Buttondown API error codes to our error codes
export function mapButtondownError(data: { code: string; detail?: string }): NewsletterErrorCode {
  if (data.code === 'email_already_exists') {
    return NEWSLETTER_ERROR_CODES.ALREADY_SUBSCRIBED;
  }

  if (data.code === 'email_invalid') {
    return NEWSLETTER_ERROR_CODES.INVALID_EMAIL;
  }

  return NEWSLETTER_ERROR_CODES.SERVER_ERROR;
}
