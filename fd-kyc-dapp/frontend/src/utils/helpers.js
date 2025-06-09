// This file contains helper functions used in various components.

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
};

export const calculateMaturityDate = (depositDate, duration) => {
    const date = new Date(depositDate);
    date.setMonth(date.getMonth() + duration);
    return date;
};

export const calculateInterest = (principal, rate, duration) => {
    return (principal * rate * duration) / 100;
};

export const isValidAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
};