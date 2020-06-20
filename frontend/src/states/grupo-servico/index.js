import { selectorFamily, selector, atomFamily, atom } from 'recoil';
import api from '../../services/api';

const EMPTY_GRUPO_SERVICO = {
    nome: '',
    sigla: '',
    descricao: '',
    ativo: true
}

export const grupoServicoState = atomFamily({
    key: 'grupoServicoState',
    default: id => id?fetchGrupoServico(id):EMPTY_GRUPO_SERVICO,
});

export const fetchGrupoServico = selectorFamily({
    key: 'fetchGrupoServico',
    get: id => async () => {
        try {
            const response = await api.get(`grupos-servicos/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
});

export const fetchGruposServicos = selector({
    key: 'fetchGruposServicos',
    get: async () => {
        try {
            const response = await api.post('grupos-servicos/pesquisa');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
});


export const gruposServicosState = atom({
    key: 'gruposServicosState',
    default: fetchGruposServicos
});
