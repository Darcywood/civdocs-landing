import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Heading,
  Text,
  Button,
} from '@react-email/components';

interface TrialWelcomeProps {
  name: string;
  toEmail: string;
  loginUrl: string;
  baseUrl: string;
}

export default function TrialWelcome({
  name = 'User',
  toEmail = 'user@example.com',
  loginUrl = 'https://app.civdocs.com.au/login',
  baseUrl = 'https://civdocs.com.au',
}: TrialWelcomeProps) {
  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header with Logo */}
          <Section style={styles.header}>
            <Img
              src="https://kmzmpiuopwsaptfecdnh.supabase.co/storage/v1/object/public/Brand/CivDocs%20(4).png"
              alt="CivDocs"
              width="120"
              height="48"
              style={styles.logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={styles.content}>
            <Heading style={styles.heading}>
              Welcome to CivDocs, {name}!
            </Heading>
            
            <Text style={styles.paragraph}>
              We're excited to have you on board! Your free trial has been activated and you're ready to start managing your civil documents more efficiently.
            </Text>

            <Text style={styles.paragraph}>
              You can now log in using the password you created during signup.
            </Text>

            {/* CTA Button */}
            <Section style={styles.buttonContainer}>
              <Button style={styles.button} href={loginUrl}>
                Go to Dashboard →
              </Button>
            </Section>

            <Text style={styles.paragraph}>
              If you have any questions or need assistance getting started, don't hesitate to reach out. We're here to help!
            </Text>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.signature}>
              Best regards,<br />
              <strong>Darcy</strong><br />
              Founder, CivDocs
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: 0,
  },
  container: {
    margin: '0 auto',
    padding: '20px 0',
    maxWidth: '600px',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: '30px 20px',
    textAlign: 'center' as const,
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    borderBottom: '1px solid #e5e7eb',
  },
  logo: {
    margin: '0 auto 16px',
    display: 'block',
  },
  content: {
    backgroundColor: '#ffffff',
    padding: '40px 30px',
  },
  heading: {
    color: '#1a1a1a',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 20px 0',
    textAlign: 'center' as const,
  },
  paragraph: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#444',
    margin: '0 auto 16px',
    maxWidth: '500px',
    textAlign: 'center' as const,
  },
  credentialsBox: {
    backgroundColor: '#f7fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '20px',
    margin: '24px 0',
  },
  credentialLabel: {
    color: '#718096',
    fontSize: '14px',
    fontWeight: '600',
    margin: '8px 0 4px 0',
  },
  credentialValue: {
    color: '#1a1a1a',
    fontSize: '16px',
    fontWeight: '500',
    margin: '0 0 16px 0',
    fontFamily: 'monospace',
  },
  buttonContainer: {
    textAlign: 'center' as const,
    margin: '32px 0',
  },
  button: {
    background: 'linear-gradient(135deg, #FF6B00 0%, #FFA800 100%)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '12px 32px',
    border: 'none',
    cursor: 'pointer',
    margin: '24px auto 12px',
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: '20px 30px 40px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
  },
  signature: {
    color: '#4a5568',
    fontSize: '14px',
    lineHeight: '20px',
    margin: '0',
    textAlign: 'center' as const,
  },
};
