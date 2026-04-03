import {
  FooterLinksType,
  LangCode,
  Footer as MuiItaliaFooter,
  PreLoginFooterLinksType,
} from '@pagopa/mui-italia';
import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { CONFIG } from '../../config/env';
import i18n from '../../locale/locale-utils';
import { LANGUAGES, pagoPALink } from './FooterConfig';

type FooterProps = {
  loggedUser: boolean;
  productsJsonUrl?: string;
  onExit?: (exitAction: () => void) => void;
};
declare const window: any;
// eslint-disable-next-line sonarjs/cognitive-complexity
export default function Footer({
  loggedUser,
  productsJsonUrl,
  onExit = (exitAction) => exitAction(),
}: FooterProps) {
  const { t } = useTranslation();

  const currentLangByUrl = new URLSearchParams(window.location.search).get('lang') as LangCode;
  const lang = (currentLangByUrl ? currentLangByUrl : i18n.language) as LangCode;

  useEffect(() => {
    if (lang) {
      void i18n.changeLanguage(lang);
    }
  }, [lang]);

  const preLoginLinks: PreLoginFooterLinksType = {
    // First column
    aboutUs: {
      title: undefined,
      links: [
        // TODO
        // {
        //   label: 'PNRR',
        //   href: 'CONFIG.FOOTER.LINK.PNRR',
        //   ariaLabel: 'Vai al link: PNRR',
        //   linkType: 'internal',
        // },
        {
          label: t('common.footer.preLoginLinks.aboutUs.links.aboutUs'),
          href: CONFIG.FOOTER.LINK.ABOUTUS,
          ariaLabel: `${t('common.footer.preLoginLinks.aboutUs.links.aboutUs')}: vai al link`,
          linkType: 'internal',
        },
        {
          label: t('common.footer.preLoginLinks.aboutUs.links.media'),
          href: CONFIG.FOOTER.LINK.MEDIA,
          ariaLabel: `${t('common.footer.preLoginLinks.aboutUs.links.media')}: vai al link`,
          linkType: 'internal',
        },
        {
          label: t('common.footer.preLoginLinks.aboutUs.links.workwithud'),
          href: CONFIG.FOOTER.LINK.WORKWITHUS,
          ariaLabel: `${t('common.footer.preLoginLinks.aboutUs.links.workwithud')}: vai al link`,
          linkType: 'internal',
        },
      ],
    },
    // Third column
    resources: {
      title: t('common.footer.preLoginLinks.resources.title'),
      links: [
        {
          label: t('common.footer.preLoginLinks.resources.links.privacyPolicy'),
          href: CONFIG.FOOTER.LINK.PRIVACYPOLICY,
          ariaLabel: `${t('common.footer.preLoginLinks.resources.links.privacyPolicy')}: vai al link`,
          linkType: 'internal',
        },
        {
          label: t('common.footer.preLoginLinks.resources.links.certifications'),
          href: CONFIG.FOOTER.LINK.CERTIFICATIONS,
          ariaLabel: `${t('common.footer.preLoginLinks.resources.links.certifications')}: vai al link`,
          linkType: 'internal',
        },
        {
          label: t('common.footer.preLoginLinks.resources.links.informationsecurity'),
          href: CONFIG.FOOTER.LINK.INFORMATIONSECURITY,
          ariaLabel: `${t('common.footer.preLoginLinks.resources.links.informationsecurity')}: vai al link`,
          linkType: 'internal',
        },
        {
          label: t('common.footer.preLoginLinks.resources.links.protectionofpersonaldata'),
          href: CONFIG.FOOTER.LINK.PROTECTIONOFPERSONALDATA,
          ariaLabel: `${t('common.footer.preLoginLinks.resources.links.protectionofpersonaldata')}: vai al link`,
          linkType: 'internal',
        },
        {
          label: t('common.footer.preLoginLinks.resources.links.cookies'),
          onClick: () => window.OneTrust.ToggleInfoDisplay(),
          ariaLabel: `${t('common.footer.preLoginLinks.resources.links.cookies')}: vai al link`,
          linkType: 'internal',
        },
        {
          label: t('common.footer.preLoginLinks.resources.links.termsandconditions'),
          href: CONFIG.FOOTER.LINK.TERMSANDCONDITIONS,
          ariaLabel: `${t('common.footer.preLoginLinks.resources.links.termsandconditions')}: vai al link`,
          linkType: 'internal',
        },
        {
          label: t('common.footer.preLoginLinks.resources.links.transparentcompany'),
          href: CONFIG.FOOTER.LINK.TRANSPARENTCOMPANY,
          ariaLabel: `${t('common.footer.preLoginLinks.resources.links.transparentcompany')}: vai al link`,
          linkType: 'internal',
        },
        {
          label: t('common.footer.preLoginLinks.resources.links.disclosurePolicy'),
          href: CONFIG.FOOTER.LINK.DISCLOSUREPOLICY,
          ariaLabel: `${t('common.footer.preLoginLinks.resources.links.disclosurePolicy')}: vai al link`,
          linkType: 'internal',
        },
        {
          label: t('common.footer.preLoginLinks.resources.links.model231'),
          href: CONFIG.FOOTER.LINK.MODEL231,
          ariaLabel: `${t('common.footer.preLoginLinks.resources.links.model231')}: vai al link`,
          linkType: 'internal',
        },
      ],
    },
    // Fourth column
    followUs: {
      title: t('common.footer.preLoginLinks.followUs.title'),
      socialLinks: [
        {
          icon: 'linkedin',
          title: 'LinkedIn',
          href: CONFIG.FOOTER.LINK.LINKEDIN,
          ariaLabel: 'Link: vai al sito LinkedIn di PagoPA S.p.A.',
        },
        {
          title: 'Twitter',
          icon: 'twitter',
          href: CONFIG.FOOTER.LINK.TWITTER,
          ariaLabel: 'Link: vai al sito Twitter di PagoPA S.p.A.',
        },
        {
          icon: 'instagram',
          title: 'Instagram',
          href: CONFIG.FOOTER.LINK.INSTAGRAM,
          ariaLabel: 'Link: vai al sito Instagram di PagoPA S.p.A.',
        },
        {
          icon: 'medium',
          title: 'Medium',
          href: CONFIG.FOOTER.LINK.MEDIUM,
          ariaLabel: 'Link: vai al sito Medium di PagoPA S.p.A.',
        },
      ],
      links: [
        {
          label: t('common.footer.preLoginLinks.accessibility'),
          href: CONFIG.FOOTER.LINK.ACCESSIBILITY,
          ariaLabel: `${t('common.footer.preLoginLinks.accessibility')}: vai al link`,
          linkType: 'internal',
        },
      ],
    },
  };
  const postLoginLinks: Array<FooterLinksType> = [
    {
      label: t('common.footer.postLoginLinks.privacyPolicy'),
      href: CONFIG.FOOTER.LINK.PRIVACYPOLICY,
      ariaLabel: `${t('common.footer.postLoginLinks.privacyPolicy')}: vai al link`,
      linkType: 'internal',
    },
    {
      label: t('common.footer.postLoginLinks.protectionofpersonaldata'),
      href: CONFIG.FOOTER.LINK.PROTECTIONOFPERSONALDATA,
      ariaLabel: `${t('common.footer.postLoginLinks.protectionofpersonaldata')}: vai al link`,
      linkType: 'internal',
    },
    {
      label: t('common.footer.postLoginLinks.termsandconditions'),
      href: CONFIG.FOOTER.LINK.TERMSANDCONDITIONS,
      ariaLabel: `${t('common.footer.postLoginLinks.termsandconditions')}: vai al link`,
      linkType: 'internal',
    },
    {
      label: t('common.footer.postLoginLinks.accessibility'),
      href: CONFIG.FOOTER.LINK.ACCESSIBILITY,
      ariaLabel: `${t('common.footer.postLoginLinks.accessibility')}: vai al link`,
      linkType: 'internal',
    },
  ];
  const companyLegalInfo = (
    <Trans i18nKey="common.footer.legalInfoText">
      <strong>PagoPA S.p.A.</strong> - Società per azioni con socio unico - Capitale sociale di euro
      1,000,000 interamente versato - Sede legale in Roma, Piazza Colonna 370, <br />
      CAP 00187 - N. di iscrizione a Registro Imprese di Roma, CF e P.IVA 15376371009
    </Trans>
  );

  return (
    <MuiItaliaFooter
      companyLink={pagoPALink}
      postLoginLinks={postLoginLinks}
      preLoginLinks={preLoginLinks}
      legalInfo={companyLegalInfo}
      loggedUser={loggedUser}
      onExit={onExit}
      languages={LANGUAGES as any}
      onLanguageChanged={async (language: LangCode) => {
        await i18n.changeLanguage(language);
      }}
      currentLangCode={lang}
      productsJsonUrl={productsJsonUrl}
    />
  );
}
