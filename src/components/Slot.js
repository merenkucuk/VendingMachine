import axios from "axios";

export const selectSlot = (slot, items, setItems, setSelectedSlot, credit, setCredit, initialCredit, setInitialCredit, flashStatus, setVendItemName, setVendItemDoor) => {

    if (!items[slot]) {
        alert('No products are available at this location.');
        return;
    }
    const price = getSlotPrice(items, slot);
    if (!hasSufficientCredit(credit, price, flashStatus)) {
        alert("No credit")
        return;
    }

    setSelectedSlot(slot);
    const selectedItem = items[slot];

    if (!selectedItem || selectedItem.quantity === 0) {
        alert('product is out of stock');
        return;
    }

    if (!dispenseProduct(slot, items, setItems, flashStatus)) {
        return;
    }

    decrementCredit(credit, price, setCredit);
    showVendItem(slot, items, setVendItemName, setVendItemDoor);
    flashStatus('enjoy!');
};

export const hasSufficientCredit = (credit, price, flashStatus) => {
    if (credit >= price) {
        return true;
    }
    flashPrice(price, flashStatus);
    return false;
};

export const getSlotPrice = (items, slot) => {
    const price = items[slot].cost;
    return price;
};

export const dispenseProduct = (slot, items, setItems, flashStatus) => {
    const list = [...items];
    const item = list[slot];

    if (item.quantity < 1) {
        flashStatus('product is out of stock');
        return false;
    }

    item.quantity -= 1;

    axios
        .put(`item/${item.id}`, item)
        .then(() => {
            setItems(list);
            return true;
        })
        .catch(() => {
            return false;
        });

    return true;
};

export const decrementCredit = (credit, value, setCredit) => {
    setCredit(credit - value);
};

export const showVendItem = (slot, items, setVendItemName, setVendItemDoor) => {
    setVendItemName(items[slot].name);
    setVendItemDoor(true);
};

export const flashPrice = (price, flashStatus) => {
    flashStatus(new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price));
};