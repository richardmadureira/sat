import React from 'react';
import { useRecoilValue } from 'recoil';
import { fetchGrupoServico } from '../../states/grupo-servico';

export default function GrupoServicoDetail({ id }) {

  const grupoServico = useRecoilValue(fetchGrupoServico(id ? id : 2));

  if (!grupoServico) {
    return <span>{`Grupo de serviço não encontrado: ${id}`}</span>
  }

  return (
    <>
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
        </div>
      </div>
    </>
  );
}
