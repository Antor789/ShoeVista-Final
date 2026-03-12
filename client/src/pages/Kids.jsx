import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "../components/Products";

const Kids = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        // Correcting the path to match your backend's /api/shoes/:category
        const targetUrl = "http://localhost:5000/api/shoes/kids";

        const res = await axios.get(targetUrl);

        if (isMounted) {
          // BUG FIX: Added a check to ensure res.data exists and is an array
          if (res.data && Array.isArray(res.data)) {
            const sorted = res.data.sort(
              (a, b) => (parseInt(b.reviews) || 0) - (parseInt(a.reviews) || 0),
            );
            setProducts(sorted);
          } else {
            setProducts([]); // Fallback to empty array if no data
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Error: ${err.message}`);
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Products loading={loading} error={error} products={products} />
    </>
  );
};

export default Kids;
