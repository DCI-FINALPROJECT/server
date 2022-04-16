const filterProductsWithProductName = async (productArray) => {
  const differentNamedProducts = [];
  const filteredFoundedProducts = [];

  productArray.forEach((product) => {
    if (!differentNamedProducts.includes(product.productName)) {
      differentNamedProducts.push(product.productName);
      filteredFoundedProducts.push(product);
    }
  });

  return filteredFoundedProducts;
};

module.exports = filterProductsWithProductName;
