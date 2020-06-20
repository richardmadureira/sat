import React, { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { gruposServicosState } from '../../states/grupo-servico';
import ErrorBoundary from '../shared/ErrorBoundary';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { GrEdit, GrView, GrTrash } from 'react-icons/gr';
import { loadingState } from '../../states/global';
import api from '../../services/api';


export default function GrupoServicoLista() {
    const [gruposServicos, setGruposServicos] = useRecoilState(gruposServicosState);
    const [loading, setLoading] = useRecoilState(loadingState);

    const dtGruposServicos = useRef(null);
    const rowsPerPageOptions = [2, 5, 10, 20];
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(2);
    const [totalRecords, setTotalRecords] = useState(0);
    const [filters, setFilters] = useState(null);

    const [ativoPesquisa, setAtivoPesquisa] = useState(null);

    const onPage = async event => {
        setFirst(event.first);
        setRows(event.rows);
        setLoading(true);
        try {
            const response = await api.post(`grupos-servicos/pesquisa?size=${event.rows}&page=${event.page + 1}`, {});
            setTotalRecords(parseInt(response.headers['x-total-count']));
            setGruposServicos(response.data);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const onFilter = async event => {
        setLoading(true);
        setFilters(event.filters);
        const gsTmp = {};
        const fields = Object.keys(event.filters);
        for (const field of fields) {
            gsTmp[field] = event.filters[field].value;
        }
        try {
            const response = await api.post(`grupos-servicos/pesquisa?size=${rows}&page=1`, gsTmp);
            setTotalRecords(parseInt(response.headers['x-total-count']));
            setGruposServicos(response.data);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const actionBodyTemplate = (grupoServico, column) => {
        return (
            <>
                <Link to={`detail/${grupoServico.id}`} className="p-button-secondary"><GrView size="24px" /></Link>
                <Link to={`edit/${grupoServico.id}`} className="mx-2 p-button-secondary"><GrEdit size="24px" /></Link>
                <Link to={`delete/${grupoServico.id}`} className="p-button-secondary"><GrTrash size="24px" /></Link>
            </>
        );
    };

    const listaSimOuNao = [
        { label: 'Todos', value: null},
        { label: 'Sim', value: true},
        { label: 'Não', value: false}
    ]

    const ativoFilter = <Dropdown style={{width: '100%'}} placeholder="Ativo" value={ativoPesquisa} options={listaSimOuNao} onChange={(e) => onChangeAtivoFilter(e)} showClear />;

    const onChangeAtivoFilter = event =>{
        setAtivoPesquisa(event.value);
        dtGruposServicos.current.filter(event.value, 'ativo', 'eq');
    }

    const ativoBodyTemplate = (grupoServico, column) => {
        return (grupoServico.ativo)?<span>Sim</span>:<span>Não</span>
    }

    return (
        <ErrorBoundary>
            <React.Suspense fallback={<div>Carregando Grupo de Serviço...</div>}>
                <DataTable id="grupos-servicos" ref={dtGruposServicos} header="Grupos de Serviços" value={gruposServicos} responsive={true} lazy={true} paginator={true}
                    footer={`Total de registros: ${totalRecords}`}
                    loading={loading} rows={rows} rowsPerPageOptions={rowsPerPageOptions} onFilter={onFilter}
                    filters={filters} emptyMessage={<div className="text-center">Nenhum grupo de serviço encontrado</div>}
                    first={first} onPage={onPage} totalRecords={totalRecords}>
                    <Column header="Nome" field="nome" filter={true} filterPlaceholder="Nome" filterMatchMode="in" />
                    <Column header="Sigla" field="sigla" filter={true} filterPlaceholder="Sigla" filterMatchMode="in" />
                    <Column header="Ativo" body={ativoBodyTemplate} className="text-center" filter={true} filterElement={ativoFilter}/>
                    <Column header="Descrição" field="descricao" filter={true} filterPlaceholder="Descrição" filterMatchMode="in" />
                    <Column header="#" body={actionBodyTemplate} headerStyle={{ width: '10em', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
                </DataTable>
            </React.Suspense>
        </ErrorBoundary>
    );
}