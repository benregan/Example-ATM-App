import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, InputAdornment, IconButton, Snackbar, Grid } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import CreditCard from '../ccard/creditCard';
import userAccounts from '../../mocks/userAccountsMock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import logo from '../../assets/images/HE-Bank-logo-color.png';
import mockUsers from '../../mocks/userMock';
import './login.css';

const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh'
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
    const { setUser, setAccountBalance, setDailyWithdrawal } = useContext(UserContext);
    const [pin, setPin] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLastNameValid, setIsLastNameValid] = useState(true);
    const [isPinValid, setIsPinValid] = useState(true);
    const [showCard, setShowCard] = useState(false);

    const [showPin, setShowPin] = useState(false);
    const handleClickShowPin = () => setShowPin(!showPin);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const navigate = useNavigate();

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!lastName) {
            setIsLastNameValid(false);
        } else {
            setIsLastNameValid(true);
        }

        if (!pin) {
            setIsPinValid(false);
        } else {
            setIsPinValid(true);
        }

        const matchedUser = mockUsers.find(user => user.lastName.toLowerCase() === lastName.toLowerCase() && user.pin === pin);

        if (matchedUser) {
            setSnackbarMessage("Pin Valid. Insert card.");
            setOpenSnackbar(true);
            setShowCard(true);
            setUser(matchedUser);

            // Find the user's account data and set it in the context
            const userAccountData = userAccounts.find(account => account.lastName === matchedUser.lastName);
            if (userAccountData) {
                setAccountBalance(userAccountData.accountBalance);
                setDailyWithdrawal(userAccountData.dailyWithdrawalLimit);
            }
            setErrorMessage('');
           
        } else {
            // Handle login error
            setErrorMessage('Invalid Last Name or PIN');
            console.error("Invalid Last Name or PIN");
        }
    };

    return (
        <Container style={containerStyles}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={logo} alt="HE-Bank" style={{ width: '300px', marginBottom: '20px' }} />
                <Typography variant="h4" gutterBottom>
                    Insert Card
                </Typography>
                <Typography variant="body2" gutterBottom>
                    (Note: This is a fictional financial institution)
                </Typography>
                <form className='login-form' onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        margin="normal"
                        value={lastName}
                        required
                        onChange={(e) => {
                            if (showCard) {
                                setShowCard(false);
                            }
                            setLastName(e.target.value)}
                        }
                        error={!isLastNameValid || !!errorMessage}
                        helperText={!isLastNameValid ? "Last Name is required" : errorMessage}
                    />
                    <TextField
                        fullWidth
                        label="PIN"
                        variant="outlined"
                        type={showPin ? 'number' : 'password'}
                        margin="normal"
                        value={pin}
                        required
                        onChange={(e) => {
                            if (showCard) {
                                setShowCard(false);
                            }
                            const result = e.target.value.replace(/\D/g, "");
                            if (e.target.value.toString().length <= 4) {
                                setPin(result)
                            }
                        }
                        }
                        maxLength="4"
                        pattern="\d*"
                        error={!isPinValid || !!errorMessage}
                        helperText={!isPinValid ? "PIN is required" : errorMessage}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPin}
                                    >
                                        {showPin ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            maxLength: 4
                        }}
                    />
                    <Typography variant="caption">
                        Note: Your pin is the 4-digit number created when you set up your account. If you do not have your pin handy, please call <b><i>555-Get-Help</i></b> (555-498-4357) for assistance.
                    </Typography>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" type="submit" disabled={showCard}>
                            Validate Pin
                        </Button>
                    </Box>
                </form>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                    </Alert></Snackbar>
                </Grid>
                
                {showCard && (
                    <Grid item xs={12} sm={6} className={`insert-card-container ${showCard ? 'show' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Container className={`insert-card-container ${showCard ? 'show' : ''}`}>
                        <CreditCard />
                        <Box mt={2}>
                            <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
                                Insert Card
                            </Button>
                        </Box>
                    </Container>
                    </Grid>
                )}
                
            </Grid>
        </Container>
    );
}

export default Login;