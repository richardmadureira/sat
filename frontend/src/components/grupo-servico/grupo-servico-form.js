import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useParams, useNavigate } from 'react-router';
import { grupoServicoState, gruposServicosState } from '../../states/grupo-servico';
import api from '../../services/api';
import { FaSave } from 'react-icons/fa';
import { loadingState, messagesState } from '../../states/global';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function GrupoServicoForm({ mode }) {
    const { id } = useParams();
    const [grupoServico, setGrupoServico] = useRecoilState(grupoServicoState(id));
    const setGruposServicos = useSetRecoilState(gruposServicosState);
    const navigate = useNavigate();
    const [loading, setLoading] = useRecoilState(loadingState);

    const onChangeNome = e => {
        setGrupoServico({ ...grupoServico, nome: e.target.value });
    };

    const onChangeSigla = e => {
        setGrupoServico({ ...grupoServico, sigla: e.target.value });
    };

    const onChangeAtivo = e => {
        setGrupoServico({ ...grupoServico, ativo: e.target.value });
    };

    const onChangeDescricao = e => {
        setGrupoServico({ ...grupoServico, descricao: e.target.value });
    };

    const salvarAtualizar = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            if (grupoServico.id) {
                let tmp = Object.assign({}, grupoServico);
                delete tmp.id;
                const response = await api.put(`grupos-servicos/${grupoServico.id}`, tmp);
                setGrupoServico(response.data);
                setGruposServicos(gruposExistentes => {
                    let newList = gruposExistentes.filter(gs => gs.id !== grupoServico.id);
                    newList.push(response.data);
                    return newList;
                });
            } else {
                const response = await api.post('grupos-servicos', grupoServico);
                setGrupoServico(response.data);
                setGruposServicos(gruposServicosExistentes => [...gruposServicosExistentes, response.data]);
            }
            navigate('../../');
        } catch (error) {
            throw error
        } finally {
            setLoading(false);
        }
    }

    if(loading){
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ProgressSpinner/>
            </div>
        );
    }

    return (
        <React.Suspense fallback="<h2>Carregando Grupo de Serviço</h2>">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Grupo de Serviço</h5>
                    <form id="form-grupo-servico" onSubmit={salvarAtualizar}>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label id="labelNomeDetalhe" htmlFor="nomeDetalhe">Nome</label>
                                    <input id="nomeDetalhe" type="text" value={grupoServico?.nome} onChange={onChangeNome} className="form-control form-control-sm" placeholder="Ex.: Aposentadorias" />
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="form-group">
                                    <label id="labelSiglaDetalhe" htmlFor="siglaDetalhe">Sigla</label>
                                    <input id="siglaDetalhe" type="text" value={grupoServico?.sigla} onChange={onChangeSigla} className="form-control form-control-sm" placeholder="Ex.: APO" />
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="form-group">
                                    <label id="labelAtivoDetalhe" htmlFor="ativoDetalhe">Ativo</label>
                                    <input id="ativoDetalhe" type="text" value={grupoServico?.ativo} onChange={onChangeAtivo} className="form-control form-control-sm" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label id="labelDescricaoDetalhe" htmlFor="descricaoDetalhe">Descrição</label>
                                    <input id="descricaoDetalhe" type="text" value={grupoServico?.descricao} onChange={onChangeDescricao} className="form-control form-control-sm" placeholder="Aposentadorias diversas" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                {mode === 'new' && <button id="btnSubmit" type="submit" className="btn btn-primary btn-sm"><FaSave /> Salvar</button>}
                                {mode === 'edit' && <button id="btnSubmit" type="submit" className="btn btn-primary btn-sm"><FaSave /> Atualizar</button>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </React.Suspense>
    );
}