export type CompanyLinkType = {
  href: string;
  ariaLabel: string;
};

export type FooterLinksType = {
  label: string;
  href: string;
  ariaLabel: string;
  linkType: LinkType;
};

export type LinkType = 'internal' | 'external';

export type PartySwitchItem = {
  id: string;
  name: string;
};

export type ProductSwitchItem = {
  id: string;
  title: string;
  productUrl: string;
  linkType: LinkType;
};

export type ProductEntity = ProductSwitchItem;

export type PreLoginFooterSingleSectionType = {
  title?: string;
  links: Array<FooterLinksType>;
};

export type PreLoginFooterSocialLink = {
  icon: string;
  href: string;
  title: string;
  ariaLabel: string;
};

export type PreLoginFooterLinksType = {
  aboutUs: PreLoginFooterSingleSectionType;
  productsAndServices: PreLoginFooterSingleSectionType;
  resources: PreLoginFooterSingleSectionType;
  followUs: {
    title: string;
    socialLinks: Array<PreLoginFooterSocialLink>;
    links: Array<FooterLinksType>;
  };
};

export type LangCode = 'it' | 'en';
export type LangLabels = Record<LangCode, string>;
