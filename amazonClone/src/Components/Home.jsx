import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-lg bg-white"
            >
             {product.image && (
                <img
                  src={product.image}
                  alt={product.productName}
                  className=" w-70 h-80 object-cover rounded"
                />
              )}

              <h2 className="text-lg font-semibold mt-2">
                {product.productName}
              </h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-md font-bold mt-2">${product.price}</p>
              <p className="text-sm text-green-600">{product.delivery}</p>
              <button className="btn rounded-xl p-2 mt-2 bg-yellow-400 text-black-400">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
