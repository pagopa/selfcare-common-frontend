export default {
  common: {
    errorBoundary: {
      sessionModalTitle: 'Error',
      sessionModalMessage: 'Sorry, something went wrong. ',
      toastError: 'ERROR',
      toastMessage: 'Sorry, something went wrong. ',
    },
    blockingErrorPage: {
      title: 'Sorry, something went wrong. ',
      description: 'Due to a system error, the procedure cannot be completed.',
      buttonLabel: 'Contact support',
    },
    footer: {
      legalInfoText:
        '<0>PagoPA S.p.A.</0> - Joint-stock company with sole shareholder - Share capital of €1,000,000 fully paid up - Registered office in Rome, Piazza Colonna 370, <2/> Postcode 00187 - Registration number in the Companies Register of Rome, Tax Code and VAT number 15376371009',
      privacyPolicyLink: 'Privacy Policy ',
      termsAndConditionLink: 'Website Terms and Conditions of Use ',
      informationSecurityLink: 'Information security ',
      assistanceLink: 'Support ',
      preLoginLinks: {
        aboutUs: {
          links: {
            aboutUs: 'PagoPA S.p.A.',
            media: 'Media',
            workwithud: 'Work with us',
          },
        },
        resources: {
          title: 'Resources',
          links: {
            privacyPolicy: 'Privacy Policy',
            certifications: 'Certifications',
            informationsecurity: 'Information security',
            protectionofpersonaldata: 'Right to protection of personal data',
            cookies: 'Cookie Preferences',
            termsandconditions: 'Terms and Conditions',
            transparentcompany: 'Transparent company',
            disclosurePolicy: 'Responsible Disclosure Policy',
            model231: 'Model 231',
          },
        },
        followUs: {
          title: 'Follow us on',
        },
        accessibility: 'Accessibility',
      },
      postLoginLinks: {
        privacyPolicy: 'Privacy Policy',
        protectionofpersonaldata: 'Right to protection of personal data',
        termsandconditions: 'Terms and Conditions',
        accessibility: 'Accessibility',
      },
    },
    header: {
      exitButton: 'Exit',
      chipLabel: 'PagoPA Operator',
    },
    filterModal: {
      title: 'Filter by ',
      button: 'Filter',
    },
    sessionModal: {
      closeButton: 'Cancel',
      confirmButton: 'Try again',
    },
    unloadEventHandler: {
      title: 'Are you sure you want to logout?',
      message: 'If you exit, your changes will be lost.',
      confirmLabel: 'Exit',
    },
    roles: {
      admin: {
        shortLabel: 'Administrative ref.',
        longLabel: 'Administrator',
        description: 'Has all permissions and manages users',
      },
      limited: {
        shortLabel: 'Operational ref.',
        longLabel: 'Operator',
        description: 'Manages the technological integration and/or operation of services',
      },
    },
    pnpgRoles: {
      admin: {
        shortLabel: 'Administrative ref.',
        longLabel: 'Administrator',
        description: 'Has all permissions and manages users',
      },
      limited: {
        shortLabel: 'Technical ref.',
        longLabel: 'Technician',
        description: "Reads the entity's notifications",
      },
    },
    backComponent: {
      label: 'Back',
    },
  },
};
