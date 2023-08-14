export const collectMoney = (initialCredit, credit, setCollectedMoney) => {
    const totalPaid = initialCredit - credit;

    if (totalPaid >= 0) {
        setCollectedMoney(totalPaid);
    } else {
        alert("Money is insufficient, please deposit more.");
    }
};