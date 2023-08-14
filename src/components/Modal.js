export const openModal = (setModalIsOpen) => {
    setModalIsOpen(true);
};

export const closeModal = (setModalIsOpen) => {
    setModalIsOpen(false);
};

export const openEditModal = (index, items, setEditingItem, setIsEditModalOpen) => {
    const selectedItem = items[index];
    setEditingItem({
        index,
        cost: selectedItem.cost,
        quantity: selectedItem.quantity
    });
    setIsEditModalOpen(true);
};

export const closeEditModal = (setEditingItem, setIsEditModalOpen) => {
    setIsEditModalOpen(false);
    setEditingItem({
        index: null,
        cost: 0,
        quantity: 0
    });
};

export const openAddProductModal = (setIsAddProductModalOpen) => {
    setIsAddProductModalOpen(true);
};

export const closeAddProductModal = (setIsAddProductModalOpen, setNewProductName, setNewProductCost, setNewProductQuantity) => {
    setIsAddProductModalOpen(false);
    setNewProductName('');
    setNewProductCost(0);
    setNewProductQuantity(0);
};

export const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 9999
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: '5px',
        padding: '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        background: 'white',
        width: '60%'
    }
};