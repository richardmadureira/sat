import React from 'react';
import { useParams } from 'react-router-dom';
import { grupoServicoState } from '../../recoil/atoms';
import { useRecoilValueLoadable } from 'recoil';

function GrupoServicoDetalhe() {
    const { id } = useParams('id');
    const grupoServicoLoadable = useRecoilValueLoadable(grupoServicoState(id));
    switch (grupoServicoLoadable.state) {
        case 'hasValue':
            const grupoServico = grupoServicoLoadable.contents;
            return (
                <>
                    <h3>{`Grupo de Serviço ${id}`}</h3>
                    <div>{grupoServico?.nome}</div>
                    <div>{grupoServico?.sigla}</div>
                    <div>{grupoServico?.descricao}</div>
                    <div>{grupoServico?.ativo}</div>
                </>
            );
        case 'loading':
            return <div>Carregando...</div>
        case 'hasError':
            throw new Error('Erro ao obter grupo de serviço pelo id');
        default:
    }
}

export default GrupoServicoDetalhe;