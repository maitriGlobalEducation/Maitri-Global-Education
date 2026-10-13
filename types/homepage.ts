export interface PublicHomepageSection {
  type: string;
  isVisible: boolean;
  order: number;
  content: Record<string, unknown>;
}

export interface PublicHomepage {
  hero: {
    isVisible: boolean;
    heading: string;
    subtitle: string;
    overlayOpacity: number;
    backgroundVideo: {
      url: string;
      publicId: string;
    } | null;
    cta1: {
      label: string;
      url: string;
      enabled: boolean;
    };
    cta2: {
      label: string;
      url: string;
      enabled: boolean;
    };
  };
  sections: PublicHomepageSection[];
}

export interface HomepageCareerChoiceCard {
  id: string;
  image: {
    url: string;
    publicId: string;
  } | null;
  tags: string[];
  title: string;
  source: string;
}

export interface HomepageCareerChoicesContent {
  heading: string;
  cards: HomepageCareerChoiceCard[];
}
