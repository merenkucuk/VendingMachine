export const getChange = (items, selectedSlots, credit, setCredit, setSelectedSlots, setVendItem, setVendItemDoor, setVendItemName, initialCredit) => {
    const purchasedValue = selectedSlots.reduce((total, slot) => total + items[slot].cost, 0);
    const changeAmount = (credit - purchasedValue).toFixed(2);

    alert(`Change: $${changeAmount} \nEnjoy your meal <3`);

    setCredit(initialCredit);
    setSelectedSlots([]);
    setVendItem(false);
    setVendItemDoor(false);
    setVendItemName('');
    setCredit(0);
};