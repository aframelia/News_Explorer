// types/guardian.ts

export interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields?: {
    headline?: string;
    trailText?: string;
    thumbnail?: string;
    byline?: string;
    bodyText?: string;
  };
  tags?: GuardianTag[];
  isHosted: boolean;
  pillarId?: string;
  pillarName?: string;
}

export interface GuardianTag {
  id: string;
  type: string;
  webTitle: string;
  webUrl: string;
}

export interface GuardianApiResponse {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    results: GuardianArticle[];
  };
}

export interface NewsCategory {
  id: string;
  label: string;
  emoji: string;
}

export const NEWS_CATEGORIES: NewsCategory[] = [
  { id: "uk-news", label: "UK", emoji: "🇬🇧" },
  { id: "world", label: "World", emoji: "🌍" },
  { id: "technology", label: "Tech", emoji: "💻" },
  { id: "culture", label: "Culture", emoji: "🎭" },
  { id: "sport", label: "Sport", emoji: "⚽" },
  { id: "business", label: "Business", emoji: "📈" },
  { id: "environment", label: "Climate", emoji: "🌿" },
  { id: "science", label: "Science", emoji: "🔬" },
];

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}