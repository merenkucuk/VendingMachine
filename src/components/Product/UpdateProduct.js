export const updateProduct = (editingItem, items, setItems, handleCloseEditModal) => {
    if (editingItem.index !== null) {
        const newList = [...items];
        newList[editingItem.index].cost = editingItem.cost;
        newList[editingItem.index].quantity = editingItem.quantity;
        setItems(newList);
        handleCloseEditModal();
    }
};