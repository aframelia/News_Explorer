// components/ArticleCard.tsx

import { GuardianArticle } from "@/types/guardian";
import { formatDate, truncateText } from "@/types/guardian";

interface ArticleCardProps {
  article: GuardianArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const title = article.fields?.headline || article.webTitle;
  const excerpt = article.fields?.trailText;
  const thumbnail = article.fields?.thumbnail;
  const byline = article.fields?.byline;
  const date = formatDate(article.webPublicationDate);

  return (
    <a
      href={article.webUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-100 dark:hover:shadow-indigo-950 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      aria-label={`Read article: ${title}`}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl opacity-20" aria-hidden="true">
              📰
            </span>
          </div>
        )}
        {/* Section pill */}
        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-medium px-2.5 py-1 rounded-full capitalize">
          {article.sectionName}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-3">
          {title}
        </h2>

        {excerpt && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
            {truncateText(excerpt.replace(/<[^>]+>/g, ""), 120)}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
          {byline && (
            <span className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
              {byline}
            </span>
          )}
          <time
            dateTime={article.webPublicationDate}
            className="text-xs text-zinc-400 dark:text-zinc-500 shrink-0 ml-auto"
          >
            {date}
          </time>
        </div>
      </div>
    </a>
  );
}
