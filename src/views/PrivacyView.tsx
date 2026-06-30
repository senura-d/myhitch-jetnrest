import React from 'react';
import LegalPage, { LegalSection } from '../components/LegalPage';

interface PrivacyViewProps {
  onBackToHome: () => void;
}

const sections: LegalSection[] = [
  {
    heading: 'Information we collect',
    body: [
      'We collect information you provide directly, such as your name, email address, phone number, payment details and travel preferences when you create an account or make a booking.',
      'We also collect technical data automatically, including your device type, IP address, browser, and how you interact with our platform, to keep our services secure and improve your experience.',
    ],
  },
  {
    heading: 'How we use your information',
    body: [
      'Your information is used to process bookings, communicate trip details, provide customer support, personalize recommendations, and send relevant offers where you have consented.',
      'We may use aggregated, anonymized data for analytics and to improve the performance and reliability of our platform.',
    ],
  },
  {
    heading: 'Sharing with partners',
    body: [
      'To fulfil your booking we share necessary details with the relevant accommodation providers, airlines, car rental companies, and experience operators.',
      'We never sell your personal data. We only share it with trusted service providers under strict contractual and confidentiality obligations.',
    ],
  },
  {
    heading: 'Cookies & tracking',
    body: [
      'We use cookies and similar technologies to remember your preferences, keep you signed in, and measure the effectiveness of our content. You can manage cookie preferences in your browser settings at any time.',
    ],
  },
  {
    heading: 'Data security',
    body: [
      'We apply industry-standard safeguards including encryption in transit, access controls, and regular security reviews to protect your personal information against unauthorized access or disclosure.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      'Depending on your location, you may have the right to access, correct, delete, or port your personal data, and to object to or restrict certain processing. To exercise these rights, contact our privacy team.',
      'You may also withdraw marketing consent at any time using the unsubscribe link in our emails or your account preferences.',
    ],
  },
  {
    heading: 'Data retention',
    body: [
      'We retain your information for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce our agreements.',
    ],
  },
  {
    heading: 'Changes to this policy',
    body: [
      'We may update this Privacy Policy from time to time. Material changes will be communicated through the platform or by email, and the "last updated" date above will reflect the latest revision.',
    ],
  },
];

export default function PrivacyView({ onBackToHome }: PrivacyViewProps) {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 30, 2026"
      intro="Your privacy matters to us. This policy explains what information we collect, how we use it, and the choices you have when you use our travel booking platform."
      sections={sections}
      onBackToHome={onBackToHome}
    />
  );
}
