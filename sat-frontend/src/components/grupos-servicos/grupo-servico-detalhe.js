import React from 'react';
import { useParams } from 'react-router-dom';
import { grupoServicoState } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';

function GrupoServicoDetalhe() {
    const { id } = useParams('id');
    const grupoServico = useRecoilValue(grupoServicoState(id));

    if(!grupoServico){
        return <div>Loading</div>
    }


    return (
        <>
            <h3>{`Grupo de Serviço ${id}`}</h3>
            <div>{grupoServico?.nome}</div>
            <div>{grupoServico?.sigla}</div>
            <div>{grupoServico?.descricao}</div>
            <div>{grupoServico?.ativo}</div>
        </>
    );
}

export default GrupoServicoDetalhe;