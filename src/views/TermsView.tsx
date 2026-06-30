import React from 'react';
import LegalPage, { LegalSection } from '../components/LegalPage';

interface TermsViewProps {
  onBackToHome: () => void;
}

const sections: LegalSection[] = [
  {
    heading: 'Acceptance of terms',
    body: [
      'By accessing or using our platform, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use our services.',
    ],
  },
  {
    heading: 'Eligibility',
    body: [
      'You must be at least 18 years old and able to enter into legally binding contracts to make a booking. You are responsible for ensuring that all information you provide is accurate and complete.',
    ],
  },
  {
    heading: 'Bookings & payments',
    body: [
      'When you make a booking, you enter into a contract directly with the relevant service provider (such as the hotel, airline, or operator). We act as an intermediary facilitating that reservation.',
      'Prices are shown in the selected currency and may include applicable taxes and fees. Full payment or a deposit may be required to confirm your reservation.',
    ],
  },
  {
    heading: 'Cancellations & refunds',
    body: [
      'Cancellation and refund terms vary by provider and rate type and are displayed before you confirm your booking. Non-refundable bookings cannot be cancelled for a refund.',
      'Where free cancellation applies, you must cancel within the stated window to avoid charges. Refunds are processed using your original payment method.',
    ],
  },
  {
    heading: 'User responsibilities',
    body: [
      'You agree to use the platform lawfully and not to misuse it, including by attempting to gain unauthorized access, disrupting the service, or submitting false information.',
      'You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.',
    ],
  },
  {
    heading: 'Intellectual property',
    body: [
      'All content on the platform, including text, graphics, logos, and software, is owned by us or our licensors and is protected by intellectual property laws. You may not reproduce or distribute it without permission.',
    ],
  },
  {
    heading: 'Limitation of liability',
    body: [
      'We provide the platform on an "as is" basis. To the maximum extent permitted by law, we are not liable for the acts or omissions of third-party providers, or for any indirect or consequential losses arising from your use of the service.',
    ],
  },
  {
    heading: 'Governing law',
    body: [
      'These Terms are governed by the laws of the jurisdiction in which our company is established. Any disputes will be subject to the exclusive jurisdiction of its competent courts.',
    ],
  },
  {
    heading: 'Changes to these terms',
    body: [
      'We may revise these Terms from time to time. Continued use of the platform after changes take effect constitutes acceptance of the updated Terms.',
    ],
  },
];

export default function TermsView({ onBackToHome }: TermsViewProps) {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="June 30, 2026"
      intro="Please read these Terms and Conditions carefully before using our travel booking platform. They set out the rules for using our services and the relationship between you and us."
      sections={sections}
      onBackToHome={onBackToHome}
    />
  );
}
