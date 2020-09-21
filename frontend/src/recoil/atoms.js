import { selector, selectorFamily } from 'recoil';
import api from '../api';

export const grupoServicoState = selectorFamily({
    key: 'grupo-servico',
    get: id => async() => {
        const response = await api.get(`/grupos-servicos/${id}`);
        return response.data;
    }
});

export const gruposServicosState = selector({
    key: 'grupos-servicos',
    get: async () => {
        const response = await api.post('/grupos-servicos/pesquisa');
        return response.data;
    }
})