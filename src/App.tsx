import {useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Usuarios from './scenes/usuarios';
import Carros from './scenes/carros';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {ColorModeContext, useMode} from './theme';
import FormEditCarro from './scenes/form-edit-carro';
import FormNovoCarro from './scenes/form-novo-carro';
import Login from './scenes/login';

function App() {
    //const {theme, colorMode} = useMode();
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [usuario, setUsuario] = useState({});

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {isAuthenticated ? (
                    <div className="app">
                        <Sidebar isSidebar={isSidebar} usuario={usuario}/>
                        <main className="content">
                            <Topbar setAuthenticaded={setIsAuthenticated}/>
                            <Routes>
                                <Route path="/" element={<Carros/>}/>
                                <Route path="/usuarios" element={<Usuarios/>}/>
                                <Route path="/carros" element={<Carros/>}/>
                                <Route path="/form-novo-carro" element={<FormNovoCarro/>}/>
                                <Route path="/form-edit-carro/:id" element={<FormEditCarro/>}/>
                            </Routes>
                        </main>
                    </div>
                ) : (
                    <Routes>
                        {/* Irá aparecer sempre que o usuário não estiver autentificado */}
                        <Route path="*" element={
                            <Login setAuthenticaded={setIsAuthenticated}
                                   setUsuario={setUsuario}/>}/>
                    </Routes>
                )}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
