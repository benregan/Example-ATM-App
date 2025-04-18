import React, { useContext, useState, useRef, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DashboardLayout from './dashboardLayout';
import Withdrawal from '../actionForms/withdrawal';
import Deposit from '../actionForms/deposit';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { UserContext } from '../../contexts/userContext';
import mockTransactions, { formatDate } from '../../mocks/transactionsMock';

function Dashboard() {
    const { accountBalance, dailyWithdrawal } = useContext(UserContext);
    const [showDeposit, setShowDeposit] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const transactionsRef = useRef(null);
    const [showMoreIndicator, setShowMoreIndicator] = useState(true);
    const [transactions, setTransactions] = useState(mockTransactions);

    const handleScroll = () => {
        if (transactionsRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = transactionsRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 5) {
                setShowMoreIndicator(false);
            } else {
                setShowMoreIndicator(true);
            }
        }
    };


    useEffect(() => {
        const currentRef = transactionsRef.current;
        if (currentRef) {
          currentRef.addEventListener('scroll', handleScroll);
          return () => {
            if (currentRef) {
              currentRef.removeEventListener('scroll', handleScroll);
            }
          };
        }
      }, []);

    const handleMoreClick = () => {
        if (transactionsRef.current) {
            const lineHeight = 50;
            transactionsRef.current.scrollTop += lineHeight;
        }
    };

    const handleTransactions = (amount = 0, action = '') => {
        let transactionType;
    
        switch (action) {
            case 'deposit':
                transactionType = 'Deposit';
                break;
            case 'withdrawal':
                transactionType = 'Withdrawal';
                break;
            default:
                console.error('Invalid action provided to handleTransactions');
                return;
        }
    

        if (transactionType) {
            setTransactions(prevTransactions => [
                {
                    id: Date.now(),
                    type: transactionType,
                    amount,
                    date: formatDate(new Date())
                },
                ...prevTransactions
            ]);
        }
    };


    return (
        <DashboardLayout>
            <Grid container spacing={3}>
                {/* Account Balance Card */}
                <Grid item xs={12} md={4}>
                    <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <Box display="flex" alignItems="flex-start">
                                <AccountBalanceIcon fontSize="large" style={{ marginRight: '8px' }} />
                                <Typography variant="h5" gutterBottom>
                                    Account Balance
                                </Typography>
                            </Box>
                            <Typography variant="h3" style={{ color: accountBalance >= 0 ? 'green' : 'red', marginTop: 'auto' }}>
                                ${accountBalance.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Daily Withdrawal Limit Card */}
                <Grid item xs={12} md={4}>
                    <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent style={{ flexGrow: 1 }}>
                            <Typography variant="h5" gutterBottom>
                                Daily Withdrawal Limit
                            </Typography>
                            <Typography variant="h3">
                                ${dailyWithdrawal.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Actions Card */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Actions
                            </Typography>
                            <Box mt={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => {
                                        setShowWithdraw(false);
                                        setShowDeposit(!showDeposit)}
                                    }
                                    style={{ backgroundColor: "green" }}
                                >
                                    Make Deposit
                                </Button>
                            </Box>
                            <Box mt={2}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => {
                                            setShowDeposit(false)
                                            setShowWithdraw(!showWithdraw)
                                        }
                                    }
                                    style={{ backgroundColor: 'red', color: 'white' }}
                                >
                                    Make Withdrawal
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Transactions list card */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Transactions
                            </Typography>
                            <List
                                style={{
                                    maxHeight: '280px',
                                    overflowY: 'auto',
                                    position: 'relative'
                                }}
                                ref={transactionsRef}
                            >
                                {transactions.map(transaction => (
                                    <ListItem key={transaction.id}>
                                        <ListItemText
                                            primary={
                                                <>
                                                    <Typography component="span" variant="body2">
                                                        {transaction.type}:&nbsp;
                                                    </Typography>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        style={{
                                                            color: transaction.type === 'Deposit' ? 'green' : 'red'
                                                        }}
                                                    >
                                                        {transaction.type === 'Deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                                                    </Typography>
                                                </>
                                            }
                                            secondary={`Date: ${transaction.date}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            {showMoreIndicator && (
                                <Box display="flex" justifyContent="center" mt={1}>
                                    <IconButton size="small" onClick={handleMoreClick}>
                                        <ArrowDownwardIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                {/* Deposit/Withdrawal Form */}
                <Grid item xs={12} md={4}>
                    {showDeposit &&
                        <Card>
                            <CardContent>

                                <Deposit updateTransactions={handleTransactions}/>
                            </CardContent>
                        </Card>
                    }
                    {showWithdraw &&
                        <Card>
                            <CardContent>
                                <Withdrawal updateTransactions={handleTransactions}/>
                            </CardContent>
                        </Card>
                    }

                </Grid>
            </Grid>
        </DashboardLayout>
    );
}

export default Dashboard;
