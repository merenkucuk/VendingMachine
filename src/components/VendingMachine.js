import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {insertMoney} from "./Credit/InsertMoney";
import {getChange} from "./Credit/GetChange";
import {cancelPurchase} from "./Credit/CancelPurchase";
import {selectSlot} from "./Slot";
import {collectMoney} from "./Credit/CollectMoney";
import {addProduct} from "./Product/AddProduct";
import {updateProduct} from "./Product/UpdateProduct";
import {deleteProduct} from "./Product/DeleteProduct";
import {
    closeAddProductModal,
    closeEditModal, closeModal,
    modalStyles, openAddProductModal,
    openEditModal, openModal
} from "./Modal";

import '../css/bootstrap.css';
import '../css/machine.css';

const VendingMachine = () => {
    const [credit, setCredit] = useState(0);
    const [status, setStatus] = useState('');
    const location = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
    const [vendItem, setVendItem] = useState(false);
    const [vendItemDoor, setVendItemDoor] = useState(false);
    const [vendItemName, setVendItemName] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [initialCredit, setInitialCredit] = useState(0);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [collectedMoney, setCollectedMoney] = useState(0);
    const [soldItems, setSoldItems] = useState([]);
    const initialQuantities = [10, 10, 10, 10, 10, 10, 10, 10, 10];
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [newProductName, setNewProductName] = useState('');
    const [newProductCost, setNewProductCost] = useState(0);
    const [newProductQuantity, setNewProductQuantity] = useState(0);
    const [temperature, setTemperature] = useState(25);
    const [isCooling, setIsCooling] = useState(false);
    const [editingItem, setEditingItem] = useState({
        index: null,
        cost: 0,
        quantity: 0
    });
    const [items, setItems] = useState([
        { name: 'Water', cost: 25.0, quantity: 10 },
        { name: 'Coke', cost: 35.0, quantity: 10 },
        { name: 'Soda', cost: 45.0, quantity: 10 },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const simulatedTemperature = Math.floor(Math.random() * 10) + 20;
            setTemperature(simulatedTemperature);

            if (simulatedTemperature > 28) {
                alert('Warning: High Temperature');
                startCooling();
            }
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    const handleInsertCoin = (value) => {
        insertMoney(value, credit, setCredit, initialCredit, setInitialCredit, flashStatus);
    };

    const handleDispenseChange = () => {
        getChange(items, selectedSlots, credit, setCredit, setSelectedSlots, setVendItem, setVendItemDoor, setVendItemName, initialCredit);
    };

    const handleCancelPurchase = (slot) => {
        cancelPurchase(slot, items, setItems, setVendItem, setVendItemDoor, setSelectedSlot, credit, setCredit, setVendItemName);
    };

    const handleSelectSlot = (slot) => {
        selectSlot(slot, items, setItems, setSelectedSlot, credit, setCredit, initialCredit, setInitialCredit, flashStatus, setVendItemName, setVendItemDoor);
    };

    const handleCollectMoney = () => {
        collectMoney(initialCredit, credit, setCollectedMoney);
    };

    const handleAddProduct = () => {
        addProduct(items, setItems, newProductName, newProductCost, newProductQuantity, handleCloseAddProductModal);
    };

    const startCooling = () => {
        setIsCooling(true);
        setTimeout(() => {
            setIsCooling(false);
            setTemperature(25);
        }, 5000);
    };

    const flashStatus = message => {
        setStatus(message);
        setTimeout(() => {
            setStatus('');
        }, 2000);
    };

    const handleOpenModal = () => {
        openModal(setModalIsOpen);
    };

    const handleCloseModal = () => {
        closeModal(setModalIsOpen);
    };

    const handleOpenEditModal = (index) => {
        openEditModal(index, items, setEditingItem, setIsEditModalOpen);
    };

    const handleCloseEditModal = () => {
        closeEditModal(setEditingItem, setIsEditModalOpen);
    };

    const handleOpenAddProductModal = () => {
        openAddProductModal(setIsAddProductModalOpen);
    };

    const handleCloseAddProductModal = () => {
        closeAddProductModal(setIsAddProductModalOpen, setNewProductName, setNewProductCost, setNewProductQuantity);
    };

    const handleUpdateProduct = () => {
        updateProduct(editingItem, items, setItems, handleCloseEditModal);
    };

    const handleDeleteProduct = (index) => {
        deleteProduct(index, items, setItems);
    };

    const resetVendingMachine = () => {
        setCredit(0);
        setSoldItems([]);
        setCollectedMoney(0);
        setInitialCredit(0);
        setItems(items.map((item, index) => ({ ...item, quantity: initialQuantities[index] })));

    };

    return (
        <div className="container">
            <div className="row whole-machine">
                <div className="col-sm-offset-2 col-sm-6 machine">
                    {[...items].map((item, index) => (
                        <div key={index} className={`col-xs-4 ${item.quantity === 0 ? 'item-style-out' : 'item-style'}`}>
                            <div className="text-center">
                                {item.name}
                                <p>{item.quantity}</p>
                            </div>
                            <div className="item-price">
                                <span>{location[index]}</span>
                                <span className="pull-right">{new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(item.cost)}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-sm-4 machine-input">
                    <div className="row">
                        <div className="btn-group" role="group" aria-label="Add Money">
                            <button type="button" className="btn btn-default" onClick={() => handleInsertCoin(1)}>$1</button>
                            <button type="button" className="btn btn-default" onClick={() => handleInsertCoin(5)}>$5</button>
                            <button type="button" className="btn btn-default" onClick={() => handleInsertCoin(10)}>$10</button>
                            <button type="button" className="btn btn-default" onClick={() => handleInsertCoin(20)}>$20</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group">
                            <div className="col-xs-6">
                                <input type="text" className="change-input form-control" readOnly value={new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(credit)}></input>
                            </div>
                            <div className="col-xs-6">
                                <input type="text" className="change-input form-control" readOnly value={status}></input>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="btn-toolbar" role="toolbar" aria-label="İşlemler">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-default change-button" onClick={handleDispenseChange}>Get Change</button>
                            </div>

                            <div className="btn-group" role="group" aria-label="Ürün Seç">
                                <button type="button" className="btn btn-default btn-lg" onClick={() => handleSelectSlot(0)}>A1</button>
                                <button type="button" className="btn btn-default btn-lg" onClick={() => handleSelectSlot(1)}>A2</button>
                                <button type="button" className="btn btn-default btn-lg" onClick={() => handleSelectSlot(2)}>A3</button>
                                <button type="button" className="btn btn-default btn-lg" onClick={() => handleSelectSlot(3)}>B1</button>
                                <button type="button" className="btn btn-default btn-lg" onClick={() => handleSelectSlot(4)}>B2</button>
                                <button type="button" className="btn btn-default btn-lg" onClick={() => handleSelectSlot(5)}>B3</button>
                                <button type="button" className="btn btn-default btn-lg" onClick={() => handleSelectSlot(6)}>C1</button>
                                <button type="button" className="btn btn-default btn-lg" onClick={() => handleSelectSlot(7)}>C2</button>
                                <button type="button" className="btn btn-default btn-lg" onClick={() => handleSelectSlot(8)}>C3</button>
                            </div>
                        </div>
                    </div>
                    <div className="row vend-door-black">
                        <div className={`vend-door`}>
                            <div className="item-style-vend text-center">
                                {vendItemName}
                            </div>
                        </div>
                    </div>
                    <div className="row purchased-items">
                        <div className="col-xs-12 text-center">
                            {vendItemName && (
                                <span>
                                      {vendItemName} is purchased
                                    </span>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="vend-item-space"></div>
                        {selectedSlot !== null && (
                            <div className="text-center" style={{ marginTop: '10px' }}>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleCancelPurchase(selectedSlot)}
                                >
                                    Cancel Request
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="row" style={{ marginTop: '10px' }}>
                        <div className="col-xs-12 text-center">
                            <button className="btn btn-primary" onClick={resetVendingMachine}>
                                Reset Machine
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 text-center" style={{ marginTop: '10px' }}>
                            <button className="btn btn-success" onClick={handleCollectMoney}>
                                Collect Money
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            {collectedMoney > 0 && (
                                <p>
                                    Collected Money: {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(collectedMoney)}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="row myrow" style={{ marginTop: '10px' }}>
                        <button className="btn btn-default service-button" onClick={handleOpenModal}>
                            <span className="glyphicon glyphicon-cog"></span>
                        </button>
                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={handleCloseModal}
                        contentLabel="Example Modal"
                        ariaHideApp={false}
                        style={modalStyles}
                    >
                        <h2>Settings</h2>
                        <ul className="custom-list">
                            <li style={{ marginBottom: '10px' }}>
                                <div className="table-list">
                                    <div style={{ flex: 3 }}>Product Name</div>
                                    <div style={{ flex: 2 }}>Price</div>
                                    <div style={{ flex: 2 }}>Quantity</div>
                                </div>
                            </li>
                            {[...items].map((item, index) => (
                                <li key={index}>
                                    <div className="content-list">
                                        <div style={{ flex: 3 }}>{item.name}</div>
                                        <div style={{ flex: 2 }}>{item.cost}</div>
                                        <div style={{ flex: 1 }}>{item.quantity}</div>
                                        <div>
                                            <button className="btn btn-primary" onClick={() => handleOpenEditModal(index)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteProduct(index)}>Delete</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={handleOpenAddProductModal}>Add Product</button>
                            <button className="btn btn-danger" onClick={handleCloseModal}>Close</button>
                        </div>
                    </Modal>
                    <Modal
                        isOpen={isEditModalOpen}
                        onRequestClose={handleCloseEditModal}
                        contentLabel="Example Modal"
                        ariaHideApp={false}
                        style={modalStyles}
                    >
                        <h2>Edit Product</h2>
                        {editingItem.index !== null && (
                            <div>
                                <div className="form-group">
                                    <label>Price:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={editingItem.cost}
                                        onChange={(e) => setEditingItem({ ...editingItem, cost: parseFloat(e.target.value) })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Quantity:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={editingItem.quantity}
                                        onChange={(e) => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="button-group">
                                    <button className="btn btn-primary" onClick={handleUpdateProduct} style={{marginRight: "10px"}}>Save</button>
                                    <button className="btn btn-danger" onClick={handleCloseEditModal}>Close</button>
                                </div>
                            </div>
                        )}
                    </Modal>
                    <Modal
                        isOpen={isAddProductModalOpen}
                        onRequestClose={handleCloseAddProductModal}
                        contentLabel="Example Modal"
                        ariaHideApp={false}
                        style={modalStyles}
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Add Product</h2>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Product Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newProductName}
                                        onChange={(e) => setNewProductName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price:</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        value={newProductCost}
                                        onChange={(e) => setNewProductCost(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Quantity:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={newProductQuantity}
                                        onChange={(e) => setNewProductQuantity(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={handleAddProduct}>Add</button>
                                <button className="btn btn-danger" onClick={handleCloseAddProductModal}>Close</button>
                            </div>
                        </div>
                    </Modal>
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            <div className="temperature-container">
                                <div className="temperature-icon">
                                    <i className="fas fa-thermometer-half"></i>
                                </div>
                                <div className="temperature">
                                    <p>{temperature}°C</p>
                                </div>
                            </div>
                            {isCooling && <p className="cooling-text">Cooling...</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendingMachine;