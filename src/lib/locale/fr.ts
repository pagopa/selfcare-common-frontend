export default {
  common: {
    errorBoundary: {
      sessionModalTitle: 'Erreur',
      sessionModalMessage: 'Désolé, quelque chose s’est mal passé. ',
      toastError: 'ERREUR',
      toastMessage: 'Désolé, quelque chose s’est mal passé. ',
    },
    blockingErrorPage: {
      title: 'Désolé, quelque chose s’est mal passé. ',
      description:
        'En raison d’une erreur du système, il n’est pas possible de terminer la procédure.',
      buttonLabel: 'Contacter le support',
    },
    footer: {
      legalInfoText:
        '<0>PagoPA S.p.A.</0> - Société anonyme à associé unique - Capital social de 1,000,000 euros entièrement libéré - Siège social à Rome, Piazza Colonna 370, <2/> CP 00187 - N ° d’immatriculation au Registre du Commerce et des Sociétés de Rome, N ° de TVA 15376371009',
      privacyPolicyLink: 'politique de confidentialité ',
      termsAndConditionLink: 'Conditions générales d’utilisation ',
      informationSecurityLink: 'Sécurité des informations ',
      assistanceLink: 'Assistance ',
      preLoginLinks: {
        aboutUs: {
          links: {
            aboutUs: 'PagoPA S.p.A.',
            media: 'Médias',
            workwithud: 'Carrière',
          },
        },
        resources: {
          title: 'Ressources',
          links: {
            privacyPolicy: 'Politique de confidentialité',
            certifications: 'Certifications',
            informationsecurity: 'Sécurité des informations',
            protectionofpersonaldata: 'Droit à la protection des données personnelles',
            cookies: 'Préférences en matière de cookies',
            termsandconditions: 'Conditions générales',
            transparentcompany: 'Société transparente',
            disclosurePolicy: 'Politique de divulgation responsable',
            model231: 'Modèle 231',
          },
        },
        followUs: {
          title: 'Suivez-nous sur',
        },
        accessibility: 'Accessibilité',
      },
      postLoginLinks: {
        privacyPolicy: 'Politique de confidentialité',
        protectionofpersonaldata: 'Droit à la protection des données personnelles',
        termsandconditions: 'Conditions générales',
        accessibility: 'Accessibilité',
      },
    },
    header: {
      exitButton: 'Quitter',
      chipLabel: 'Opérateur PagoPA',
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
      title: 'Voulez -vous vraiment quitter ?',
      message: 'Si vous quittez, les modifications apportées seront perdues.',
      confirmLabel: 'Quitter',
    },
    roles: {
      admin: {
        shortLabel: 'Ref. Administratif',
        longLabel: 'Administrateur',
        description: 'A toutes les autorisations et gère les utilisateurs',
      },
      limited: {
        shortLabel: 'Ref. Opérationnel',
        longLabel: 'Opérateur',
        description: 'Gère l’intégration technologique et/ou le fonctionnement des services',
      },
    },
    pnpgRoles: {
      admin: {
        shortLabel: 'Ref. Administratif',
        longLabel: 'Administrateur',
        description: 'A toutes les autorisations et gère les utilisateurs',
      },
      limited: {
        shortLabel: 'Ref. Technicien',
        longLabel: 'Technicien',
        description: 'Lire les notifications de l’organisme',
      },
    },
    backComponent: {
      label: 'Retour',
    },
  },
};
