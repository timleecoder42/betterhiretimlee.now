import { z } from 'zod';

export enum NewsletterErrorCode {
  InvalidEmail = 'INVALID_EMAIL',
  AlreadySubscribed = 'ALREADY_SUBSCRIBED',
  RateLimited = 'RATE_LIMITED',
  ServerError = 'SERVER_ERROR',
  UnknownError = 'UNKNOWN_ERROR',
}

export type NewsletterError = {
  code: NewsletterErrorCode;
  message: string;
};

export const newsletterSchema = z.object({
  email: z.string().email({ message: NewsletterErrorCode.InvalidEmail }),
  locale: z.string().min(2).max(10),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Map Buttondown API error codes to our error codes
export function mapButtondownError(data: { code: string; detail?: string }): NewsletterErrorCode {
  if (data.code === 'email_already_exists') {
    return NewsletterErrorCode.AlreadySubscribed;
  }

  if (data.code === 'email_invalid') {
    return NewsletterErrorCode.InvalidEmail;
  }

  return NewsletterErrorCode.ServerError;
}
