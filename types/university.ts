export interface UniversityImage {
  url: string;
  publicId: string;
}

export interface University {
  _id: string;
  name: string;
  slug: string;
  country: string;
  logo: UniversityImage | null;
  reportLabel: string;
  reportYear: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
  status: "draft" | "published";
}
