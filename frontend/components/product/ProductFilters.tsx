// components/product/ProductFilters.tsx

'use client';

interface ProductFiltersProps {
  activeCategory: string;
  setActiveCategory: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const categories = [
  'All',
  'Home',
  'Fashion',
  'Tech',
  'Lifestyle',
];

export function ProductFilters({
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
      {/* Categories */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const active = activeCategory === category;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
                active
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 bg-white outline-none"
      >
        <option value="rating">Highest Rated</option>
        <option value="priceLow">Price: Low to High</option>
        <option value="priceHigh">Price: High to Low</option>
        <option value="reviews">Most Reviewed</option>
      </select>
    </div>
  );
}