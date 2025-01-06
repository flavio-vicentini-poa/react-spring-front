import axios from 'axios';
import {Carro} from '../../model/carro';

class CarroService {
    serverPath = '/api/carros';
    //apiUrl = 'http://localhost:8080';
    //apiUrl = 'http://52.45.177.208:9041';
    apiUrl = process.env.REACT_APP_API_URL;

    getAllPaginated(page: number, limit: number) {
        return axios.get<Carro[]>(this.apiUrl + this.serverPath, {
            headers: {
                'page': page,
                'size': limit
            }
        });
    }

    getById(id: string) {
        return axios.get<Carro>(this.apiUrl + this.serverPath + '/' + id);
    }

    save(carro: Carro) {
        return axios.post(this.apiUrl + this.serverPath, carro);
    }

    update(id: string, carro: Carro) {
        return axios.put(this.apiUrl + this.serverPath + '/' + id, carro);
    }

    delete(id: string) {
        return axios.delete(this.apiUrl + this.serverPath + '/' + id);
    }
}

export default CarroService;