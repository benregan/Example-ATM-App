import React, { createContext, useState } from 'react';

// Create the context
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({lastName: '', pin: null});
  const [accountBalance, setAccountBalance] = useState(0);
  const [dailyWithdrawal, setDailyWithdrawal] = useState(0);

  return (
    <UserContext.Provider value={{ user, setUser, accountBalance, setAccountBalance, dailyWithdrawal, setDailyWithdrawal }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };