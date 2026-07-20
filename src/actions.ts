'use server';

import { Resend } from 'resend';
import { type ContactFormData, contactFormSchema } from './lib/form';
import { Email } from '../emails/email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: ContactFormData) {
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  const { name, email, message } = parsed.data;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL as string,
      to: process.env.RESEND_TO_EMAIL as string,
      replyTo: email,
      subject: `New message from ${name} - Personal Landing Page`,
      react: Email({ name, email, message }),
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Unexpected error from resend server action:', error);
    }
  }
}
