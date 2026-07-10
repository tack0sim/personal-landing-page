'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { contactFormSchema, type ContactFormData } from '@/lib/form';
import { Field, FieldGroup, FieldLabel, FieldError } from './ui/field';
import { Input } from './ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card';
import { Button } from './ui/button';
import { Section } from './ui/section';
import { Container } from './ui/container';
import { Textarea } from './ui/textarea';
import { sendEmail } from '@/actions';

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      // biome-ignore lint/complexity/noForEach: Ignoring forEach complexity lint rule
      result.error.issues.forEach((issue) => {
        const path = issue.path.join('.');
        newErrors[path] = issue.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await sendEmail(formData);

      toast.success('Form submitted successfully!');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch {
      toast.error(
        'An error occurred while submitting the form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact-form">
      <Container variant="narrow">
        <Card className="w-full max-w-none shadow-lg">
          <CardHeader>
            <CardTitle>Get in touch</CardTitle>
            <CardDescription>
              Send me a message and I will get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field data-invalid={errors.name ? true : undefined}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    aria-invalid={!!errors.name}
                    autoComplete="off"
                    id="name"
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your name"
                    value={formData.name}
                  />
                  {errors.name && (
                    <FieldError errors={[{ message: errors.name }]} />
                  )}
                </Field>

                <Field data-invalid={errors.email ? true : undefined}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    aria-invalid={!!errors.email}
                    autoComplete="off"
                    id="email"
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="email@example.com"
                    type="email"
                    value={formData.email}
                  />
                  {errors.email && (
                    <FieldError errors={[{ message: errors.email }]} />
                  )}
                </Field>

                <Field data-invalid={errors.message ? true : undefined}>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <Textarea
                    aria-invalid={!!errors.message}
                    autoComplete="off"
                    id="message"
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Your message"
                    value={formData.message}
                  />
                  {errors.message && (
                    <FieldError errors={[{ message: errors.message }]} />
                  )}
                </Field>
                <Field orientation="horizontal">
                  <Button
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    type="submit"
                    variant="accent"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
