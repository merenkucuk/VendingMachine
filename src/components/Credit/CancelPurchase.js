export const cancelPurchase = (slot, items, setItems, setVendItem, setVendItemDoor, setSelectedSlot, credit, setCredit, setVendItemName) => {
    const list = [...items];
    const selectedItem = list[slot];
    const refundedAmount = selectedItem.cost;

    selectedItem.quantity += 1;

    setItems(list);
    setVendItem(false);
    setVendItemDoor(false);
    setSelectedSlot(null);
    setCredit(credit + refundedAmount);
    setVendItemName('');
};