import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../services/productService';

export const useProducts = (initialSize = 12) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchProducts = useCallback(async (page = 0, size = initialSize) => {
    try {
      setLoading(true);
      const data = await getProducts(page, size);
      setProducts(data.content || data.products || data);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.number || page);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [initialSize]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [fetchProducts, currentPage]);

  const setPage = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return { products, loading, error, totalPages, currentPage, setPage };
};

export default useProducts;
