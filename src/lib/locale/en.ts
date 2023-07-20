export default {
  common: {
    errorBoundary: {
      sessionModalTitle: 'Error',
      sessionModalMessage: 'Sorry, something went wrong.',
      toastError: 'ERROR',
      toastMessage: 'Sorry, something went wrong.',
    },
    blockingErrorPage: {
      title: 'Sorry, something went wrong.',
      description: 'Due to a system error the procedure could not be completed.',
      buttonLabel: 'Contact Support',
    },
    footer: {
      legalInfoText: `<0>PagoPA S.p.A.</0> - Joint-stock company with sole shareholder - Share capital of 1,000,000 euro fully paid - Registered office in Rome, Piazza Colonna 370, <2/> CAP 00187 - Registration number in the Rome Company Register, Fiscal Code and VAT number 15376371009`,
      privacyPolicyLink: 'Privacy Policy',
      termsAndConditionLink: 'Terms and conditions of use of the site',
      informationSecurityLink: 'Information Security',
      assistanceLink: 'Assistance ',
      preLoginLinks: {
        aboutUs: {
          links: {
            aboutUs: 'PagoPA S.p.A.',
            media: 'Average',
            workwithud: 'Work with us',
          },
        },
        resources: {
          title: 'Resources',
          links: {
            privacyPolicy: 'Privacy Policy',
            certifications: 'Certifications',
            informationsecurity: 'Information security',
            protectionofpersonaldata: 'Right to the protection of personal data',
            cookies: 'Cookie Preferences',
            termsandconditions: 'Terms and conditions',
            transparentcompany: 'Transparent company',
            disclosurePolicy: 'Responsible Disclosure Policy',
            Model321: 'Model 321',
          },
        },
        followUs: {
          title: 'Follow us on',
        },
      },
      postLoginLinks: {
        privacyPolicy: 'Privacy policy',
        protectionofpersonaldata: 'Right to the protection of personal data',
        termsandconditions: 'Terms and conditions',
      },
    },
    header: {
      exitButton: 'Exit',
    },
    filterModal: {
      title: 'Filter by ',
      button: 'Filter',
    },
    sessionModal: {
      closeButton: 'Cancel',
      confirmButton: 'Retry',
    },
    unloadEventHandler: {
      title: 'Do you really want to go out?',
      message: 'If you exit, your changes will be lost.',
      confirmLabel: 'Exit',
    },
    roles: {
      admin: {
        shortLabel: 'Ref. Administrative',
        longLabel: 'Administrator',
        description: 'Has all permissions and manages users',
      },
      limited: {
        shortLabel: 'Ref. Operating',
        longLabel: 'Operator',
        description: 'Manages technology integration and/or service operation',
      },
    },
    pnpgRoles: {
      admin: {
        shortLabel: 'Ref. Administrative',
        longLabel: 'Administrator',
        description: 'Has all permissions and manages users',
      },
      limited: {
        shortLabel: 'Ref. Technician',
        longLabel: 'Technical',
        description: 'Read notifications from the institution',
      },
    },
    backComponent: {
      label: 'Back',
    },
  },
};
