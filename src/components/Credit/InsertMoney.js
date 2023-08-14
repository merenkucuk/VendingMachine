export const insertMoney = (value, credit, setCredit, initialCredit, setInitialCredit, flashStatus) => {
    if (isScamDetected(flashStatus)) {
        alert("Fake money has been detected. Please use real money");
        flashStatus("Fake");
        return;
    }
    setCredit(credit + value);
    setInitialCredit(initialCredit + value);
};

export const isScamDetected = (flashStatus) => {
    const scamDetected = Math.random() < 0.05;

    if (scamDetected) {
        flashStatus('Fake money detected!');
        return true;
    }

    return false;
};