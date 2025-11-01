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

interface PasswordResetProps {
  name: string;
  resetUrl: string;
  baseUrl: string;
}

export default function PasswordReset({
  name = 'User',
  resetUrl = 'https://civdocs.com.au/reset-password',
  baseUrl = 'https://civdocs.com.au',
}: PasswordResetProps) {
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
              Reset Your Password
            </Heading>
            
            <Text style={styles.paragraph}>
              Hi {name},
            </Text>

            <Text style={styles.paragraph}>
              We received a request to reset your CivDocs password. If you didn't make this request, you can safely ignore this email.
            </Text>

            <Text style={styles.paragraph}>
              To reset your password, click the button below:
            </Text>

            {/* CTA Button */}
            <Section style={styles.buttonContainer}>
              <Button style={styles.button} href={resetUrl}>
                Reset Password →
              </Button>
            </Section>

            <Text style={styles.paragraph}>
              This link will expire in 1 hour for security reasons.
            </Text>

            <Text style={styles.paragraph}>
              If you have any questions or need assistance, don't hesitate to reach out. We're here to help!
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
