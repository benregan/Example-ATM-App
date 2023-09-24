import React, {useContext} from 'react';
import { Box, Button, AppBar, Toolbar } from '@mui/material';
import { UserContext } from '../../contexts/userContext'; 
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/HE-Bank-logo-color.png'; // Update the path

function DashboardLayout({ children }) {
const { setUser, setAccountBalance, setDailyWithdrawal } = useContext(UserContext);
const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <AppBar position="static" color="default" style={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Box flexGrow={1} style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="HE-Bank" style={{ width: '150px', marginLeft: '16px', marginTop: '8px', marginBottom: '8px' }} />
          </Box>
          <Button 
            color="primary" 
            variant="contained" 
            onClick={(e) => {
                e.preventDefault();
                setUser(null);
                setAccountBalance(0);
                setDailyWithdrawal(0);
                navigate('/');
                
            }}
            sx={{ color: 'white' }}
        >
            Logout
        </Button>
        </Toolbar>
      </AppBar>
      <Box flexGrow={1} p={3}>
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;
