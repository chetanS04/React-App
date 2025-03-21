import React, { useState, useRef, useEffect } from "react";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [delivery, setDelivery] = useState("");
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, []);


  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);
  

  const printData = (e) => {
    e.preventDefault();
    const newProduct = { productName, description, price, delivery, image };

    if (editProduct !== null) {
      let updatedProducts = [...products];
      updatedProducts[editProduct] = newProduct;
      setProducts(updatedProducts);
      setEditProduct(null);
    } else {
      setProducts([...products, newProduct]);
    }

    setProductName("");
    
    setDescription("");
    setPrice("");
    setDelivery("");
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };



  const handleEdit = (index) => {
    const product = products[index];
    setProductName(product.productName);
    setDescription(product.description);
    setPrice(product.price);
    setDelivery(product.delivery);
    setImage(product.image);
    setEditProduct(index);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
    
    <div className="flex flex-col w-150 justify-end  items-center  pt-11">


    <form className="p-2 w-fit border-2 border-black m-2" onSubmit={printData}>
      <label>Product Name</label>
      <input className="border border-black rounded px-2 w-full mt-1 mb-3" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
  
      <label>Description</label>
      <input className="border border-black rounded px-2 w-full mt-1 mb-3" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
  
      <label>Price</label>
      <input className="border border-black rounded px-2 w-full mt-1 mb-3" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
  
      <label>Delivery</label>
      <input className="border border-black rounded px-2 w-full mt-1 mb-3" type="text" value={delivery} onChange={(e) => setDelivery(e.target.value)} />
  
      <label>Image</label>
      <input ref={fileInputRef} className="border border-black rounded px-2 w-full mt-1 mb-3" type="file" accept="image/*" onChange={handleUpload} />
  
      <button className="border-2 border-black py-2 px-10 rounded-full mt-4" type="submit">
        {editProduct !== null ? "Update" : "Submit"}
      </button>
    </form>


    <div className="w-fit p-5">
      {products.length > 0 ? (
        <table className="border border-black w-full text-center">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-black px-3 py-2">Product Name</th>
              <th className="border border-black px-3 py-2">Description</th>
              <th className="border border-black px-3 py-2">Price</th>
              <th className="border border-black px-3 py-2">Delivery</th>
              <th className="border border-black px-3 py-2">Image</th>
              <th className="border border-black px-3 py-2">Actions</th>
            </tr>
          </thead>

          
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="bg-amber-50">
                <td className="border border-black px-3 py-2">{product.productName}</td>
                <td className="border border-black px-3 py-2">{product.description}</td>
                <td className="border border-black px-3 py-2">{product.price}</td>
                <td className="border border-black px-3 py-2">{product.delivery}</td>
                <td className="border border-black px-3 py-2">
                  {product.image && <img src={product.image} alt="img" className="h-16 w-16 object-cover mx-auto" />}
                </td>
                <td className="border border-black px-3 py-2">
                  <button onClick={() => handleEdit(index)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                  <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No products available.</p>
      )}
    </div>



  </div>
  </>
  
  );
};

export default CreateProduct;
