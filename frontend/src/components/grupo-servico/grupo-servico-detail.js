import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { FaTrashAlt, FaTimes } from 'react-icons/fa';
import { grupoServicoState } from '../../states/grupo-servico';
import ErrorBoundary from '../shared/ErrorBoundary';
import { ProgressSpinner} from 'primereact/progressspinner';

export default function GrupoServicoDetail({ mode = 'detail' }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const grupoServico = useRecoilValue(grupoServicoState(id));

  if (!grupoServico) {
    return <span>{`Grupo de serviço não encontrado: ${id}`}</span>
  }

  const excluir = e => {
    console.log(`Excluindo grupo de serviço ${grupoServico.id}`);
  }

  function Buttons() {
    return (
      <div className="row">
        <div className="col text-center">
          {mode === 'delete' && <button id="btn-excluir" onClick={excluir} className="btn btn-danger"><FaTrashAlt /> Excluir</button>}
          {mode === 'detail' && <button id="btn-voltar" onClick={() => navigate('/')} className="btn btn-primary"><FaTimes /> Voltar</button>}
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<ProgressSpinner/>}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Detalhe do Grupo de Serviço</h5>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label id="labelNomeDetalhe" htmlFor="nomeDetalhe">Nome</label>
                  <input id="nomeDetalhe" type="text" value={grupoServico.nome} className="form-control form-control-sm" readOnly disabled />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label id="labelSiglaDetalhe" htmlFor="siglaDetalhe">Sigla</label>
                  <input id="siglaDetalhe" type="text" value={grupoServico.sigla} className="form-control form-control-sm" readOnly disabled />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group">
                  <label id="labelAtivoDetalhe" htmlFor="ativoDetalhe">Ativo</label>
                  <input id="ativoDetalhe" type="text" value={grupoServico.ativo} className="form-control form-control-sm" readOnly disabled />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label id="labelDescricaoDetalhe" htmlFor="descricaoDetalhe">Descrição</label>
                  <input id="descricaoDetalhe" type="text" value={grupoServico.descricao} className="form-control form-control-sm" readOnly disabled />
                </div>
              </div>
            </div>
            <Buttons />
          </div>
        </div>
      </React.Suspense>
    </ErrorBoundary>
  );
}
