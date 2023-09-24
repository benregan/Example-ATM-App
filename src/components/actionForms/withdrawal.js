import React, { useContext, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { UserContext } from '../../contexts/userContext';

function Withdrawal({ updateTransactions }) {
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { accountBalance, setAccountBalance, dailyWithdrawal, setDailyWithdrawal } = useContext(UserContext);

  const handleWithdrawal = (e) => {
    e.preventDefault();
    
    const withdrawalAmount = parseFloat(amount);
    if (accountBalance > 0) {
        if (!isNaN(withdrawalAmount) && withdrawalAmount > 0 && withdrawalAmount <= dailyWithdrawal && withdrawalAmount <= accountBalance) {
        setErrorMessage('');
        setAccountBalance(prevBalance => prevBalance - withdrawalAmount);
        setDailyWithdrawal(prevLimit => prevLimit - withdrawalAmount);
        updateTransactions(withdrawalAmount, "withdrawal");
        setAmount('');
        } else if (withdrawalAmount >= dailyWithdrawal || (dailyWithdrawal - withdrawalAmount) < 0) {
            setErrorMessage("This transaction would exceed your daily limit");
        }
    } else {
        setErrorMessage("Unable to make a withdrawal with a negative account balance");
    }
  };

  return (
    <form onSubmit={handleWithdrawal}>
      <TextField
        label="Withdrawal Amount"
        value={amount}
        type="number"
        onChange={(e) => {
                setErrorMessage('');
                setAmount(e.target.value)
            }
        }
        InputProps={{
            inputProps: { min: 0 }
          }}
        fullWidth
        error={!!errorMessage}
        helperText={errorMessage}
      />
      <Box mt={2}>
        <Button variant="contained" type="submit" style={{ backgroundColor: 'red', color: 'white' }}>
          Withdraw
        </Button>
      </Box>
    </form>
  );
}

export default Withdrawal;
