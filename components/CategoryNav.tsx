interface Props {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
  }
  
  const categories = [
    { id: "", label: "All" },
    { id: "technology", label: "Tech" },
    { id: "business", label: "Business" },
    { id: "sport", label: "Sport" },
    { id: "politics", label: "Politics" },
  ];
  
  export default function CategoryNav({
    activeCategory,
    onCategoryChange,
  }: Props) {
    return (
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-4 py-2 rounded-full text-sm ${
              activeCategory === cat.id
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    );
  }