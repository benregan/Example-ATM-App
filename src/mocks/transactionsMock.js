function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  export function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();
  
    return `${month}-${day}-${year}`;
  }
  
  const transactionTypes = ['Deposit', 'Withdrawal'];
  
  const mockTransactions = Array.from({ length: getRandomInt(1, 10) }).map((_, index) => {
    const randomDate = new Date(getRandomInt(2020, 2023), getRandomInt(0, 11), getRandomInt(1, 28));
    return {
      id: index + 1,
      type: transactionTypes[getRandomInt(0, transactionTypes.length - 1)],
      amount: getRandomInt(10, 500),
      date: formatDate(randomDate)
    };
  });
  mockTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  export default mockTransactions;