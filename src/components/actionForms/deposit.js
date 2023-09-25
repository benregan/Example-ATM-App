import React, { useContext, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { UserContext } from '../../contexts/userContext';

function Deposit({ updateTransactions }) {
  const [amount, setAmount] = useState('');
  const { setAccountBalance } = useContext(UserContext);

  const handleDeposit = (e) => {
    e.preventDefault();
    
    const depositAmount = parseFloat(amount);
    if (!isNaN(depositAmount) && depositAmount > 0) {
      
      setAccountBalance(prevBalance => prevBalance + depositAmount);
      
      updateTransactions(depositAmount, "deposit");
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleDeposit}>
      <TextField
        label="Deposit Amount"
        value={amount}
        type="number"
        onChange={(e) => {
                setAmount(e.target.value)
            }
        }
        InputProps={{
            inputProps: { min: 0 }
          }}
        fullWidth
      />
      <Box mt={2}>
        <Button variant="contained" type="submit" style={{ backgroundColor: 'green', color: 'white' }}>
          Deposit
        </Button>
      </Box>
    </form>
  );
}

export default Deposit;
