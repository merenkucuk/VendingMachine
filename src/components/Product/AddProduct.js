export const addProduct = (items, setItems, newProductName, newProductCost, newProductQuantity, handleCloseAddProductModal) => {
    const newProduct = {
        name: newProductName,
        cost: newProductCost,
        quantity: newProductQuantity,
    };
    setItems([...items, newProduct]);
    handleCloseAddProductModal();
};