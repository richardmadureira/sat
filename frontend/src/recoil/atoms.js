import { atom, selector, selectorFamily } from 'recoil';
import api from '../api';

export const drawerOpenState = atom({
    key: 'drawer-open',
    default: false
});

export const selectedMenuIndexState = atom({
    key: 'selected-menu-index',
    default: -1
});

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