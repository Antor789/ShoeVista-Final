import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "../components/Products";

const Women = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        // OPTION A: Using .env (Ensure it is /api/shoes/women)
        const targetUrl = "http://localhost:5000/api/shoes/women";
        console.log("Attempting fetch to:", targetUrl);
        // OPTION B: Hardcoded (Use this if Option A fails)
        //const targetUrl = "http://localhost:5000/api/shoes/women";

        const res = await axios.get(targetUrl);

        if (isMounted) {
          if (Array.isArray(res.data)) {
            const sorted = res.data.sort(
              (a, b) => (parseInt(b.reviews) || 0) - (parseInt(a.reviews) || 0),
            );
            setProducts(sorted);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Error while fetching products: ${err.message}`);
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

export default Women;
