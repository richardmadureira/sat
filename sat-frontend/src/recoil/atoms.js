import { atom,  selectorFamily } from 'recoil';
import api from '../api';

export const grupoServicoState = selectorFamily({
    key: 'grupo-servico',
    get: id => async() => {
        const response = await api.get(`/grupos-servicos/${id}`);
        return response.data;
    }
})