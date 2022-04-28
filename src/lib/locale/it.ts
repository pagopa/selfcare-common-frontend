export default {
  common: {
    errorBoundary: {
      sessionModalTitle: 'Errore',
      sessionModalMessage: 'Spiacenti, qualcosa è andato storto.',
      toastError: 'ERRORE',
      toastMessage: 'Spiacenti, qualcosa è andato storto.',
    },
    blockingErrorPage: {
      title: 'Spiacenti, qualcosa è andato storto.',
      description: 'A causa di un errore del sistema non è possibile completare la procedura.',
      buttonLabel: "Contatta l'assistenza",
    },
    footer: {
      legalInfoText: `PagoPA S.p.A. - società per azioni con socio unico - capitale sociale di euro 1,000,000
      interamente versato - sede legale in Roma, Piazza Colonna 370, CAP 00187 -
      <1/>
      n. di iscrizione a Registro Imprese di Roma, CF e P.IVA 15376371009`,
      privacyPolicyLink: 'Privacy Policy ',
      termsAndConditionLink: 'Termini e condizioni d’uso del sito ',
      informationSecurityLink: 'Sicurezza delle informazioni ',
      assistanceLink: 'Assistenza ',
    },
    header: {
      exitButton: 'Esci',
    },
    filterModal: {
      title: 'Filtra per ',
      button: 'Filtra',
    },
    sessionModal: {
      closeButton: 'Annulla',
      confirmButton: 'Riprova',
    },
    unloadEventHandler: {
      title: 'Vuoi davvero uscire?',
      message: 'Se esci, le modifiche apportate andranno perse.',
      confirmLabel: 'Esci',
    },
    roles: {
      admin: {
        shortLabelKey: 'Ref. Amministrativo',
        longLabelKey: 'Amministratore',
        descriptionKey: 'Ha tutti i permessi e gestisce gli utenti',
      },
      limited: {
        shortLabelKey: 'Ref. Operativo',
        longLabelKey: 'Operatore',
        descriptionKey: "Gestisce l'integrazione tecnologica e/o l'operatività dei servizi",
      },
    },
  },
};
