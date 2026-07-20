import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from 'react-email';

interface EmailProps {
  email?: string;
  message?: string;
  name?: string;
}

export const Email = ({ name, email, message }: EmailProps) => (
  <Tailwind
    config={{
      presets: [pixelBasedPreset],
      theme: {
        extend: {
          colors: {
            accent: '#4b5ba3',
            'accent-foreground': '#fff',
            border: '#f3f3f3',
          },
        },
      },
    }}
  >
    <Html>
      <Head />
      <Body className="m-0 text-center font-sans">
        {name && <Preview>A message from {name}</Preview>}
        <Container className="mx-auto w-full max-w-160">
          <Section className="p-6">
            <Section className="rounded-lg bg-border p-10 text-left sm:p-12">
              <Section className="mb-8">
                <Heading as="h1" className="m-0">
                  {name && `Message from ${name}:`}
                </Heading>
              </Section>

              {message && (
                <Text className="mt-0 mb-6 max-w-105 last:mb-0">{message}</Text>
              )}

              <Link
                className="mt-0 mb-6 w-fit cursor-pointer rounded-sm bg-accent p-1 text-accent-foreground hover:bg-accent/90"
                href={email ? `mailto:${email}` : '#'}
              >
                Reply
              </Link>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

Email.PreviewProps = {
  name: 'Dev',
  email: 'dev@email.com',
  message:
    'Do fugiat in fugiat. Labore enim sunt cillum velit elit sit consectetur occaecat cillum sit commodo consectetur ut dolore. Adipisicing non non labore amet amet ullamco deserunt. Duis culpa in Lorem tempor elit magna. Qui mollit sunt anim id aute qui dolor veniam laboris ad cillum deserunt. Deserunt eiusmod est adipisicing laboris incididunt ex fugiat adipisicing ad et consectetur nisi aute dolor. Excepteur aute Lorem eiusmod.',
} satisfies EmailProps;

export default Email;
