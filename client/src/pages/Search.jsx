import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Eye, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart } = useCart();
  const [localQuery, setLocalQuery] = useState(query);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setLocalQuery(query);
    if (query.trim()) {
      const lower = query.toLowerCase();
      const filtered = products.filter((prod) => {
        const nameMatch = prod.name.toLowerCase().includes(lower);
        const descMatch = prod.description.toLowerCase().includes(lower);
        const noteMatch = `${prod.notes?.top} ${prod.notes?.heart} ${prod.notes?.base}`.toLowerCase().includes(lower);
        const catMatch = prod.category.toLowerCase().includes(lower);
        return nameMatch || descMatch || noteMatch || catMatch;
      });
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery.trim() });
    }
  };

  return (
    <div className="bg-brand-softwhite min-h-screen pt-32 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title / Form */}
        <div className="border-b border-brand-gold/15 pb-8 mb-12">
          <span className="text-brand-gold font-sans-inter text-[10px] tracking-[0.45em] font-semibold uppercase block mb-3">
            MAISON DATABASE
          </span>
          <h1 className="font-serif-cormorant text-4xl sm:text-5xl text-brand-charcoal font-light tracking-wide mb-6">
            Search Results
          </h1>
          
          <form onSubmit={handleSearchSubmit} className="max-w-xl flex items-center border-b border-brand-charcoal/20 focus-within:border-brand-gold transition-colors duration-300">
            <input
              type="text"
              placeholder="SEARCH FRAGRANCES, NOTES, CATEGORIES..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="w-full bg-transparent py-3 text-xs tracking-widest text-brand-charcoal placeholder-brand-charcoal/30 outline-none uppercase font-sans-inter"
            />
            <button type="submit" className="p-2 text-brand-charcoal/60 hover:text-brand-gold transition-colors">
              <SearchIcon className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Results Info */}
        <div className="mb-8">
          <p className="font-sans-inter text-xs tracking-widest uppercase text-brand-charcoal/50">
            {query.trim() ? (
              <>Found {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"</>
            ) : (
              <>Enter a search term above</>
            )}
          </p>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((prod) => (
              <div
                key={prod.id}
                className="luxury-glass p-6 flex flex-col justify-between group relative hover:shadow-xl hover:shadow-brand-morning-glory/10 transition-shadow duration-500 product-card"
              >
                <div>
                  <div className="relative aspect-square overflow-hidden mb-6 border border-brand-gold/15 bg-brand-beige/60">
                    <div className="absolute inset-2 border border-brand-gold/10 pointer-events-none group-hover:border-brand-morning-glory/30 transition-colors duration-500" />
                    
                    <Link to={`/product/${prod.id}`}>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>

                    <div className="absolute inset-0 bg-brand-beige/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Link
                        to={`/product/${prod.id}`}
                        className="p-3 bg-brand-softwhite border border-brand-gold/40 rounded-full hover:border-brand-gold transition-all duration-300 text-brand-gold hover:scale-110 shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => addToCart(prod, 1, prod.sizes[0])}
                        className="p-3 bg-brand-gold rounded-full text-brand-softwhite hover:bg-brand-charcoal transition-all duration-300 hover:scale-110 shadow-sm"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-serif-cormorant text-2xl tracking-wider text-brand-charcoal group-hover:text-brand-gold transition-colors duration-300">
                      <Link to={`/product/${prod.id}`}>{prod.name}</Link>
                    </h3>
                    <span className="text-brand-gold font-sans-inter text-sm font-semibold">
                      ${prod.price}
                    </span>
                  </div>

                  <div className="flex justify-between text-[10px] tracking-widest uppercase text-brand-charcoal/40 mb-4 font-sans-inter">
                    <span>{prod.concentration}</span>
                    <span>{prod.volume}</span>
                  </div>

                  <p className="text-brand-charcoal/55 font-sans-inter text-xs font-light leading-relaxed mb-6">
                    {prod.description}
                  </p>
                </div>

                <Link
                  to={`/product/${prod.id}`}
                  className="mt-8 w-full py-3 block text-center bg-transparent border border-brand-charcoal/15 text-brand-charcoal/70 group-hover:text-brand-morning-glory group-hover:border-brand-morning-glory/50 text-[10px] font-sans-inter tracking-[0.25em] uppercase hover:bg-brand-morning-glory/5 transition-all duration-300"
                >
                  Discover Scent
                </Link>
              </div>
            ))}
          </div>
        ) : (
          query.trim() && (
            <div className="text-center py-20 border border-dashed border-brand-gold/20">
              <p className="text-brand-charcoal/45 font-sans-inter text-sm font-light">
                No products found matching your search.
              </p>
            </div>
          )
        )}

      </div>
    </div>
  );
};

export default Search;
