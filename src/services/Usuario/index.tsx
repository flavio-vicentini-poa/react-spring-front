import axios from 'axios';
import axiosInstance from '../../infra/axiosInstance';
import {Usuario} from '../../model/usuario';

class UsuarioService {
    serverPath = '/api/usuarios';
    apiUrl = process.env.REACT_APP_API_URL;

    login(user: string, password: string) {
        return axios.post(this.apiUrl + this.serverPath + '/login', {email: user, password: password});
    }

    getPerfil() {
        return axiosInstance.get(this.apiUrl + this.serverPath + '/my-profile');
    }

    getAll() {
        return axios.get<Usuario[]>(this.apiUrl + this.serverPath);
    }

}

export default UsuarioService;