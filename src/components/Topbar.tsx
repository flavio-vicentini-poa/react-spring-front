import {Box, IconButton, Tooltip, useTheme} from '@mui/material';
import {useContext} from 'react';
import {ColorModeContext} from '../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import {Logout} from '@mui/icons-material';
import {Toaster} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

interface TopbarProps {
    setAuthenticaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Topbar: React.FC<TopbarProps> = ({setAuthenticaded}) => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuthenticaded(false);
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <Box display="flex" justifyContent="flex-end" p={2}>
            <Toaster/>
            {/* ICONS */}
            <Box display="flex">
                <Tooltip title="Light / Dark">
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkModeOutlinedIcon/>
                        ) : (
                            <LightModeOutlinedIcon/>
                        )}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Logout">
                    <IconButton>
                        <Logout onClick={handleLogout}/>
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default Topbar;
