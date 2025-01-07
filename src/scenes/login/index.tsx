/**
 * Componente de Login.
 *
 * Este componente fornece:
 * - Um formulário para autenticação do usuário.
 * - Validação de credenciais via serviço `UsuarioService`.
 * - Redirecionamento para a rota `/carros` após login bem-sucedido.
 * - Mensagens de erro em caso de falhas na autenticação.
 */

import {Box, Button, CircularProgress, Container, Paper, TextField, Typography} from '@mui/material';
import {useState} from 'react';
import UsuarioService from '../../services/Usuario';
import {useNavigate} from 'react-router-dom';
import {Usuario} from '../../model/usuario';

interface LoginProps {
    setAuthenticaded: React.Dispatch<React.SetStateAction<boolean>>,
    setUsuario: React.Dispatch<React.SetStateAction<Usuario>>
}

const Login: React.FC<LoginProps> = ({setAuthenticaded, setUsuario}) => {
    const usuarioService = new UsuarioService(); // Serviço para operações relacionadas ao usuário.
    const navigate = useNavigate(); // Gerenciador de navegação.

    const [username, setUsername] = useState(''); // Armazena o nome de usuário.
    const [password, setPassword] = useState(''); // Armazena a senha.
    const [loading, setLoading] = useState(false); // Indica carregamento do login.
    const [error, setError] = useState(''); // Mensagem de erro.

    // Função para lidar com o login do usuário.
    const handleLogin = () => {
        setLoading(true);
        setError('');
        usuarioService.login(username, password)
            .then((response) => {
                // Após login bem-sucedido, busca o perfil do usuário.
                usuarioService.getPerfil()
                    .then((response) => {
                        setUsuario(response.data); // Define os dados do usuário no estado pai.
                    });
                localStorage.setItem('token', response.data['token']); // Armazena o token no localStorage.
                setAuthenticaded(true); // Define o estado autenticado.
                navigate('/carros'); // Redireciona para a página de carros.
            }).catch(error => {
            setLoading(false);
            setError('Nome de usuário ou senha inválido');
        });
    };

    return (
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
                       maxWidth: 400,
                   }}>

                <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
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
                        {loading ? <CircularProgress color="inherit"/> : 'Entrar'}
                    </Button>
                </Box>
            </Paper>
        </Container>);
};

export default Login;