import React from 'react';
import { useRecoilValue } from 'recoil';
import { fetchGruposServicos } from '../../states/grupo-servico';
import GrupoServicoItem from './grupo-servico-item';

export default function GrupoServicoLista() {
    const gruposServicos = useRecoilValue(fetchGruposServicos);
    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm table-hover table-bordered">
                <caption>Grupos de Serviços Cadastrados: {gruposServicos?.length}</caption>
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Nome</th>
                        <th className="text-center">Sigla</th>
                        <th className="text-center">Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {gruposServicos.map(gs => <GrupoServicoItem key={gs.id} value={gs} />)}
                </tbody>
            </table>
        </div>
    );
}