import React from 'react';

const Dashboard = () => {
  const [products, setProducts] = React.useState([]);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, { ...newProduct, id: Date.now() }]);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ProductList
        products={products}
        onAdd={handleAddProduct}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default Dashboard;