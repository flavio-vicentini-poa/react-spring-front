import {Box, Button, CircularProgress, Container, Paper, TextField, Typography} from "@mui/material";
import {useState} from "react";
import UsuarioService from "../../services/Usuario";
import {useNavigate} from "react-router-dom";

const Login = (props: any) => {
    const usuarioService = new UsuarioService();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = () => {
        setLoading(true);
        setError('');
        usuarioService.login(username, password)
            .then((response) => {
                usuarioService.getPerfil()
                    .then((response) => {
                        props.setUsuario(response.data);
                    })
                localStorage.setItem("token", response.data['token']);
                props.setAuthenticaded(true);
                navigate('/carros');
            }).catch(error => {
            setLoading(false);
            setError("Nome de usuário ou senha inválido");
        })
    }

    return(
        <Container component="main"
                   maxWidth="xs"
                   sx={{
                       height: '100vh',
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                   }}>

            <Paper elevation={6}
                   sx={{
                       padding: 3,
                       display: 'flex',
                       flexDirection: 'column',
                       alignItems: 'center',
                       width: '100%',
                       maxWidth: 400,}}>

                <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
                    Login
                </Typography>
                {error && (<Typography color="error" variant="body2" sx={{marginTop: 1}}>
                    {error}
                </Typography>)}

                <Box component="form" sx={{width: '100%', marginTop: 2}} noValidate>

                    <TextField
                        label="Email"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        label="Senha"
                        type="password"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        disabled={loading}
                        sx={{marginTop: 2}}
                    >
                        {loading ? <CircularProgress color="inherit" /> : 'Entrar'}
                    </Button>
                </Box>
            </Paper>
        </Container>);
}

export default Login;