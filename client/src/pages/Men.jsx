import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "../components/Products";

const Men = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(
      "Men Component Mounted - VITE_BASE_URL is:",
      import.meta.env.VITE_BASE_URL,
    );

    const fetchData = async () => {
      try {
        // Replace the template literal with the direct address
        const targetUrl = "http://localhost:5000/api/shoes/men";
        console.log("Attempting fetch to:", targetUrl);

        const response = await axios.get(targetUrl);
        console.log("Data received from server:", response.data);

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        }
      } catch (err) {
        console.error("AXIOS ERROR:", err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs once on load

  return (
    <>
      <Products loading={loading} error={error} products={products} />
    </>
  );
};

export default Men;
