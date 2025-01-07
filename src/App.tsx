/**
 * Componente principal da aplicação React.
 *
 * O componente `App` gerencia:
 * - Autenticação de usuários.
 * - Tema e alternância de modo claro/escuro.
 * - Estrutura de layout com barra lateral e barra superior.
 * - Configuração de rotas para navegação entre páginas.
 */

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
    const [theme, colorMode] = useMode(); // Gerencia o tema e o modo de cor.
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação.
    const [usuario, setUsuario] = useState({}); // Estado de autenticação.

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/> {/* Reseta os estilos padrão do navegador */}
                {isAuthenticated ? (
                    // Renderiza a aplicação principal para usuários autenticados.
                    <div className="app">
                        <Sidebar usuario={usuario}/>
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
