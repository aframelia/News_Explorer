// app/page.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { GuardianArticle } from "@/types/guardian";
import ArticleCard from "@/components/ArticleCard";
import CategoryNav from "@/components/CategoryNav";
import SearchBar from "@/components/SearchBar";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function HomePage() {
  const [articles, setArticles] = useState<GuardianArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchArticles = useCallback(
    async (reset = false) => {
      const currentPage = reset ? 1 : page;
      if (reset) {
        setLoading(true);
        setArticles([]);
        setPage(1);
        setHasMore(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      try {
        const params = new URLSearchParams({ page: currentPage.toString() });
        if (activeCategory) params.set("section", activeCategory);
        if (searchQuery) params.set("q", searchQuery);

        const res = await fetch(`/api/news?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        const newArticles: GuardianArticle[] = data.articles;

        setArticles((prev) => (reset ? newArticles : [...prev, ...newArticles]));
        setHasMore(newArticles.length === 12);
        if (!reset) setPage((p) => p + 1);
      } catch {
        setError("Could not load articles. Please try again.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [activeCategory, searchQuery, page]
  );

  // Fetch on category or search change
  useEffect(() => {
    fetchArticles(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchQuery("");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory("");
  };

  const handleLoadMore = () => {
    setPage((p) => {
      const next = p + 1;
      // fetch with next page inline
      const params = new URLSearchParams({ page: next.toString() });
      if (activeCategory) params.set("section", activeCategory);
      if (searchQuery) params.set("q", searchQuery);
      setLoadingMore(true);
      fetch(`/api/news?${params.toString()}`)
        .then((r) => r.json())
        .then((data) => {
          setArticles((prev) => [...prev, ...data.articles]);
          setHasMore(data.articles.length === 12);
        })
        .catch(() => setError("Failed to load more."))
        .finally(() => setLoadingMore(false));
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xl" aria-hidden="true">📰</span>
            <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              News Explorer
            </h1>
          </div>
          <div className="flex-1 flex justify-end sm:justify-center">
            <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Category nav */}
        <section aria-label="Filter by category" className="mb-8">
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </section>

        {/* Status message */}
        {searchQuery && !loading && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6" aria-live="polite">
            {articles.length > 0
              ? `Showing results for "${searchQuery}"`
              : `No results found for "${searchQuery}"`}
          </p>
        )}

        {/* Articles grid */}
        <section aria-label="News articles">
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div
              role="alert"
              className="text-center py-20 text-zinc-500 dark:text-zinc-400"
            >
              <p className="text-lg mb-4">⚠️ {error}</p>
              <button
                onClick={() => fetchArticles(true)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Try again
              </button>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20 text-zinc-400 dark:text-zinc-500">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg">No articles found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>

        {/* Load more */}
        {!loading && hasMore && articles.length > 0 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Load more articles"
            >
              {loadingMore ? "Loading…" : "Load more"}
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
          Powered by{" "}
          <a
            href="https://open-platform.theguardian.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            The Guardian Open Platform
          </a>{" "}
          · Built with Next.js &amp; TypeScript
        </div>
      </footer>
    </div>
  );
}
