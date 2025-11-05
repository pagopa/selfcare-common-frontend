export default {
  common: {
    errorBoundary: {
      sessionModalTitle: 'Napaka',
      sessionModalMessage: 'Žal, nekaj je šlo narobe.',
      toastError: 'NAPAKA',
      toastMessage: 'Žal, nekaj je šlo narobe.',
    },
    blockingErrorPage: {
      title: 'Žal, nekaj je šlo narobe.',
      description: 'Zaradi sistemske napake postopka ni mogoče dokončati.',
      buttonLabel: 'Stopite v stik s podporo',
    },
    footer: {
      legalInfoText:
        '<0>PagoPA S.p.A.</0> - Delniška družba z enim družbenikom - Osnovni kapital v višini 1.000.000 EUR v celoti vplačan - Sedež v Rimu, Piazza Colonna 370, <2/> Poštna številka 00187 - Št. vpisa v poslovni register v Rimu, davčna številka in identifikacijska številka za DDV 15376371009',
      privacyPolicyLink: 'Politika zasebnosti ',
      termsAndConditionLink: 'Pogoji uporabe spletnega mesta ',
      informationSecurityLink: 'Varnost podatkov ',
      assistanceLink: 'Podpora strankam ',
      preLoginLinks: {
        aboutUs: {
          links: {
            aboutUs: 'PagoPA S.p.A.',
            media: 'Mediji',
            workwithud: 'Sodeluj z nami',
          },
        },
        resources: {
          title: 'Viri',
          links: {
            privacyPolicy: 'Politika zasebnosti',
            certifications: 'Certifikati',
            informationsecurity: 'Varnost podatkov',
            protectionofpersonaldata: 'Pravica do varstva osebnih podatkov',
            cookies: 'Nastavitve piškotkov',
            termsandconditions: 'Pogoji in določila',
            transparentcompany: 'Pregledna družba',
            disclosurePolicy: 'Politika odgovornega razkritja',
            model231: 'Model 231',
          },
        },
        followUs: {
          title: 'Spremljajte nas na',
        },
        accessibility: 'Dostopnost',
      },
      postLoginLinks: {
        privacyPolicy: 'Pravilnik o zasebnosti',
        protectionofpersonaldata: 'Pravica do varstva osebnih podatkov',
        termsandconditions: 'Pogoji in določila',
        accessibility: 'Dostopnost',
      },
    },
    header: {
      exitButton: 'Izhod',
      chipLabel: 'Operater PagoPA',
    },
    filterModal: {
      title: 'Filtriraj po ',
      button: 'Filtriraj',
    },
    sessionModal: {
      closeButton: 'Prekliči',
      confirmButton: 'Poskusi znova',
    },
    unloadEventHandler: {
      title: 'Ali ste prepričani, da želite oditi?',
      message: 'Če zaprete, bodo spremembe, ki si jih naredil, izgubljene.',
      confirmLabel: 'Izhod',
    },
    roles: {
      admin: {
        shortLabel: 'Ref. Upravno',
        longLabel: 'Upravitelj',
        description: 'Ima vsa dovoljenja in upravlja uporabnike',
      },
      limited: {
        shortLabel: 'Ref. Delujoče',
        longLabel: 'Upravljavec',
        description: 'Upravlja tehnološko integracijo in/ali delovanje storitev',
      },
    },
    pnpgRoles: {
      admin: {
        shortLabel: 'Ref. Upravno',
        longLabel: 'Upravitelj',
        description: 'Ima vsa dovoljenja in upravlja uporabnike',
      },
      limited: {
        shortLabel: 'Ref. Tehnično',
        longLabel: 'Tehnik',
        description: 'Bere obvestila organizacije',
      },
    },
    backComponent: {
      label: 'Nazaj',
    },
  },
};
