/**
 * Arquivo principal de inicialização da aplicação React.
 *
 * Este código é responsável por:
 * - Renderizar o componente raiz (`App`) dentro do elemento HTML com o ID `root`.
 * - Configurar o roteamento utilizando o `BrowserRouter` do React Router.
 * - Envolver a aplicação com `React.StrictMode` para ajudar a detectar problemas potenciais.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);
