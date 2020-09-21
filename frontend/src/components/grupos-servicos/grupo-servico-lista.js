import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import GrupoServicoItem from './grupo-servico-item';
import { gruposServicosState } from '../../recoil/atoms';

function GrupoServicoLista() {
    const gruposServicosLoadable = useRecoilValueLoadable(gruposServicosState);

    switch (gruposServicosLoadable.state) {
        case 'hasValue':
            console.log('hasValue')
            const gruposServicos = gruposServicosLoadable.contents;
            return (
                <>
                    <h3>Lista de Grupos de Serviços</h3>
                    <table>
                        <tbody>
                            {gruposServicos?.map(gs => <GrupoServicoItem key={gs.id} value={gs} />)}
                        </tbody>
                    </table>
                </>
            );
        case 'loading':
            return <div>Carregando...</div>
        case 'hasError':
            throw new Error('Erro ao obter lista de grupos de serviços');
        default:
    }
}

export default GrupoServicoLista;