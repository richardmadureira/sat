import { selectorFamily, selector } from 'recoil';
import api from '../../services/api';

export const fetchGrupoServico = selectorFamily({
    key: 'fetchGrupoServico',
    get: id => async () => {
        try {
            const response = await api.get(`grupos-servicos/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
});

export const fetchGruposServicos = selector({
    key: 'fetchGruposServicos',
    get: async () => {
        try {
            const response = await api.get('grupos-servicos');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
});

