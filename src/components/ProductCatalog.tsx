import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Search, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

type CategoryFilter = 'All' | 'Outerwear' | 'Knitwear' | 'Trousers' | 'Denim' | 'Shirting' | 'Accessories';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'weight-desc' | 'rating';

export const ProductCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');

  const categories: CategoryFilter[] = [
    'All',
    'Outerwear',
    'Knitwear',
    'Trousers',
    'Denim',
    'Shirting',
    'Accessories'
  ];

  const materials = ['All', 'Wool & Cashmere', 'Kurabo Selvedge', 'Organic Cotton', 'Italian Flannel'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Material match
      if (selectedMaterial !== 'All') {
        const comp = item.composition.toLowerCase();
        if (selectedMaterial === 'Wool & Cashmere' && !comp.includes('wool') && !comp.includes('cashmere')) {
          return false;
        }
        if (selectedMaterial === 'Kurabo Selvedge' && !comp.includes('zimbabwe') && !comp.includes('kurabo')) {
          return false;
        }
        if (selectedMaterial === 'Organic Cotton' && !comp.includes('cotton')) {
          return false;
        }
        if (selectedMaterial === 'Italian Flannel' && !comp.includes('tropical wool') && !comp.includes('flannel')) {
          return false;
        }
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSub = item.subtitle.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesSub && !matchesDesc && !matchesCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'weight-desc') return b.weightGsm - a.weightGsm;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, sortOption, searchQuery, selectedMaterial]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSortOption('featured');
    setSearchQuery('');
    setSelectedMaterial('All');
  };

  return (
    <section id="collection-section" className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-stone-200 gap-6">
        <div>
          {/* Zero-Pill text metadata */}
          <div className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium mb-2">
            The Permanent & Autumn 2026 Collection
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-light text-stone-900">
            Engineered Garments
          </h2>
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Real-time search input */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search garments, fibers, weights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 focus:border-stone-900 focus:outline-none placeholder:text-stone-400 transition-colors"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="appearance-none pl-3 pr-8 py-2 text-xs bg-white border border-stone-300 focus:border-stone-900 focus:outline-none font-medium text-stone-800 cursor-pointer"
            >
              <option value="featured">Sort: Featured Collection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="weight-desc">Fabric Density (GSM)</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Segmented Controls & Material Filter */}
      <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#141416] text-white shadow-sm'
                  : 'bg-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {cat === 'All' ? 'All Pieces' : cat}
            </button>
          ))}
        </div>

        {/* Material Secondary Filter */}
        <div className="flex items-center gap-2 text-xs text-stone-600 overflow-x-auto no-scrollbar">
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-[11px] uppercase tracking-wider text-stone-400 shrink-0">Material:</span>
          {materials.map((mat) => (
            <button
              key={mat}
              onClick={() => setSelectedMaterial(mat)}
              className={`px-2 py-1 text-[11px] whitespace-nowrap transition-colors ${
                selectedMaterial === mat
                  ? 'text-stone-950 font-semibold border-b border-stone-950'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {mat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Active Filter Indicator */}
      <div className="py-4 flex items-center justify-between text-xs text-stone-500">
        <div>
          Showing <span className="font-semibold text-stone-900 tabular-nums">{filteredProducts.length}</span> pieces
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {selectedMaterial !== 'All' && ` · ${selectedMaterial}`}
        </div>

        {(selectedCategory !== 'All' || selectedMaterial !== 'All' || searchQuery) && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 text-stone-600 hover:text-stone-950 underline underline-offset-4"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-stone-50 border border-dashed border-stone-300 p-8 my-8">
          <p className="font-serif-display text-2xl text-stone-800 mb-2">No garments found</p>
          <p className="text-xs text-stone-500 max-w-md mx-auto mb-6">
            We couldn&apos;t find any items matching your selected criteria. Try resetting your search query or material filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-[#141416] text-white text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};
