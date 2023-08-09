export default {
  common: {
    errorBoundary: {
      sessionModalTitle: 'Erreur',
      sessionModalMessage: "Désolé, quelque chose s'est mal passé.",
      toastError: 'ERREUR',
      toastMessage: "Désolé, quelque chose s'est mal passé.",
    },
    blockingErrorPage: {
      title: "Désolé, quelque chose s'est mal passé.",
      description: "En raison d'une erreur du système, la procédure ne peut pas être complétée.",
      buttonLabel: "Contacter l'assistance",
    },
    footer: {
      legalInfoText: `<0>PagoPA S.p.A.</0> - Société par actions avec un seul associé - Capital social de 1 000 000 euros entièrement libéré - Siège social à Rome, Piazza Colonna 370, <2/> CAP 00187 - Numéro d'inscription au registre des entreprises de Rome, CF et P.IVA 15376371009`,
      privacyPolicyLink: 'Politique de confidentialité ',
      termsAndConditionLink: "Conditions d'utilisation du site ",
      informationSecurityLink: 'Sécurité des informations ',
      assistanceLink: 'Assistance ',
      preLoginLinks: {
        aboutUs: {
          links: {
            aboutUs: 'PagoPA S.p.A.',
            media: 'Médias',
            workwithud: 'Travailler avec nous',
          },
        },
        resources: {
          title: 'Ressources',
          links: {
            privacyPolicy: 'Politique de confidentialité',
            certifications: 'Certifications',
            informationsecurity: 'Sécurité des informations',
            protectionofpersonaldata: 'Droit à la protection des données personnelles',
            cookies: 'Préférences relatives aux cookies',
            termsandconditions: 'Conditions générales',
            transparentcompany: 'Entreprise transparente',
            disclosurePolicy: 'Politique de divulgation responsable',
            Model321: 'Modèle 321',
          },
        },
        followUs: {
          title: 'Suivez-nous sur',
        },
      },
      postLoginLinks: {
        privacyPolicy: 'Politique de confidentialité',
        protectionofpersonaldata: 'Droit à la protection des données personnelles',
        termsandconditions: 'Conditions générales',
      },
    },
    header: {
      exitButton: 'Quitter',
    },
    filterModal: {
      title: 'Filtrer par ',
      button: 'Filtrer',
    },
    sessionModal: {
      closeButton: 'Annuler',
      confirmButton: 'Réessayer',
    },
    unloadEventHandler: {
      title: 'Voulez-vous vraiment quitter?',
      message: 'Si vous quittez, toutes les modifications seront perdues.',
      confirmLabel: 'Quitter',
    },
    roles: {
      admin: {
        shortLabel: 'Admin',
        longLabel: 'Administrateur',
        description: 'Possède tous les droits et gère les utilisateurs',
      },
      limited: {
        shortLabel: 'Opérateur',
        longLabel: 'Opérateur',
        description: "Gère l'intégration technologique et/ou l'exploitation des services",
      },
    },
    pnpgRoles: {
      admin: {
        shortLabel: 'Admin',
        longLabel: 'Administrateur',
        description: 'Possède tous les droits et gère les utilisateurs',
      },
      limited: {
        shortLabel: 'Technicien',
        longLabel: 'Technicien',
        description: "Lit les notifications de l'organisme",
      },
    },
    backComponent: {
      label: 'Retour',
    },
  },
};
